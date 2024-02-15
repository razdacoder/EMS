from django.db import models

# Create your models here.


class Department(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=10)

    def __str__(self) -> str:
        return str(self.name)


class Course(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50)
    department = models.ForeignKey(
        Department, related_name="course_dep", on_delete=models.DO_NOTHING)
    exam_type = models.CharField(max_length=50, default="PBE")
    unit = models.IntegerField()

    def __str__(self) -> str:
        return str(self.name)


class Class(models.Model):

    LEVELS = (
        ("ND I", "ND I"),
        ("ND II", "ND II"),
        ("HND I", "HND I"),
        ("HND II", "HND II"),
    )

    PROGRAM = (
        ('FT', "FULL TIME"),
        ('PT', "PART TIME")
    )
    name = models.CharField(max_length=25, null=True, blank=True)
    courses = models.ManyToManyField(Course, related_name="courses")
    option = models.CharField(max_length=50, default="", null=True, blank=True)
    department = models.ForeignKey(
        Department, related_name="class_dep", on_delete=models.CASCADE)
    level = models.CharField(max_length=50, choices=LEVELS)
    program = models.CharField(
        max_length=50, choices=PROGRAM, null=True, blank=True)
    size = models.IntegerField()

    def __str__(self) -> str:
        return self.name or self.department.slug

    def save(self, *args, **kwargs):
        prefix = ""
        if self.level.startswith("H"):
            prefix = "H"
        elif self.level.startswith("N") and self.program == "FT":
            prefix = "N"
        else:
            prefix = "P"
        self.name = f"{prefix}{self.department.slug}{self.level.split(' ')[1]}"
        super(Class, self).save(*args, **kwargs)


class Hall(models.Model):

    HALL_TYPE = (
        ("Small", "Small"),
        ("medium", "Medium"),
        ("Large", "Large")
    )

    name = models.CharField(max_length=50)
    capacity = models.IntegerField()
    working_capacity = models.IntegerField(default=0)
    hall_type = models.CharField(
        max_length=50, choices=HALL_TYPE, default=HALL_TYPE[0])
    max_students = models.IntegerField(default=0)
    min_courses = models.IntegerField(default=0)

    def __str__(self) -> str:
        return str(self.name)


class HallBlock(models.Model):
    name = models.CharField(max_length=25)
    halls = models.ManyToManyField(Hall, related_name="block_hall")
    size = models.IntegerField()

    def __str__(self) -> str:
        return self.name


class Schedule(models.Model):

    PERIOD = (
        ('AM', 'AM'),
        ('PM', 'PM')
    )

    day = models.CharField(max_length=15)
    course = models.ForeignKey(
        Course, related_name="schedule_course", on_delete=models.DO_NOTHING)
    classe = models.ForeignKey(Class, on_delete=models.CASCADE,
                               related_name="schedule_class", null=True, blank=True)
    period = models.CharField(max_length=50, choices=PERIOD)

    def __str__(self) -> str:
        return f"{self.classe.department.name} {self.classe.level} | {self.course.code} | {self.day} | {self.period}"


class DistributionItem(models.Model):
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    no_of_students = models.IntegerField()


class Distribution(models.Model):
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
    items = models.ManyToManyField(DistributionItem)
    day = models.CharField(max_length=15, null=True)
    period = models.CharField(max_length=2, null=True)
