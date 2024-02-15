from datetime import datetime, timezone
import random
import math
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from random import choice, shuffle, randint

from .utils import save_to_csv, schedule_next, schedule_prev, split_courses, get_total_no_seats, get_total_no_seats_needed, convert_hall_blocks_to_dict, distribute_classes_to_halls, group_class_by_course, find_halls_for_classes, convert_hall_to_dict


from .models import Department, Class, Course, Hall, Schedule, HallBlock, DistributionItem, Distribution
from .serializers import DepartmentSerializer, ClassSerializer, CourseSerializer, HallSerializer, ScheduleSerializer, DistributionSerializer

# Create your views here.


@api_view(['POST'])
def random_classes(reqeust):
    classes = Class.objects.all()
    for cls in classes:
        number = randint(40, 120)
        cls.size = number
        cls.save()
    return Response({"message": "Done"})


@api_view(["POST"])
def generate(request):
    classes = Class.objects.all()
    # total_no_seats_needed = get_total_no_seats_needed(classes)
    # dates = ["01-02-2023", "02-02-2023", "03-02-2023", "04-02-2023", "05-02-2023", "06-02-2023", "07-02-2023",
    #          "08-02-2023", "09-02-2023", "10-02-2023", "11-02-2023", "12-02-2023", "13-02-2023", "14-02-2023"]
    for cl in classes:
        # SPLIT COURSES INTO ALREADY SCHEDULES AND AWAITING SCHEDULES COURSES
        sc_courses, nc_courses = split_courses(
            cl.courses.exclude(exam_type="NAN"))
        dates = ["01-02-2023", "02-02-2023", "03-02-2023", "04-02-2023", "05-02-2023", "06-02-2023", "07-02-2023",
                 "08-02-2023", "09-02-2023", "10-02-2023", "11-02-2023", "12-02-2023", "13-02-2023", "14-02-2023", "15-02-2023", "16-02-2023", "17-02-2023", "18-02-2023", "19-02-2023", "20-02-2023"]

        # RESCHEDULE THE ALREADY SCHEDULE COURSES FOR NEW CLASS
        schedule_prev(sc_courses, cl, dates)

        # SCHEDULE THE AWAITING COURSES FOR A CLASS
        schedule_next(nc_courses, cl, dates)

    return Response({"message": "Done"})


def save_to_db(res, day, period):
    for item in res:
        hall = Hall.objects.get(id=item["id"])
        distribution = Distribution.objects.create(
            hall=hall, day=day, period=period)
        for cls in item["classes"]:
            distItem = DistributionItem.objects.create(
                schedule=Schedule.objects.get(id=cls["id"]),
                no_of_students=cls["student_range"]
            )
            distribution.items.add(distItem)
            distribution.save()

    print("Done")


@api_view(["GET"])
def get_distribution(request, day, period):
    distributions = Distribution.objects.filter(
        day=day, period=period)
    serializer = DistributionSerializer(distributions, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_dates(request):
    dates = Schedule.objects.values("day").distinct().order_by("day")
    return Response(dates)


@api_view(["GET"])
def distribute_halls(request, day, period):

    halls = Hall.objects.all()
    total_hall_capacity = get_total_no_seats(halls=halls)
    hall_copy = convert_hall_to_dict(halls=halls)

    schedules = Schedule.objects.filter(period=period, day=day)
    total_no_seats_needed = get_total_no_seats_needed(schedules)
    total_no_cbe = get_total_no_seats_needed(
        schedules.filter(course__exam_type="CBE"))
    total_no_of_seats_needed_after_cbe = total_no_seats_needed - total_no_cbe
    total_no_seats_remaining = total_hall_capacity - \
        total_no_of_seats_needed_after_cbe
    none_cbe_schedules = schedules.exclude(
        course__exam_type__in=["NAN", "CBE"])
    res = distribute_classes_to_halls(
        schedules=none_cbe_schedules, halls=hall_copy)
    save_to_db(res, day, period)

    return Response({"message": "Done"}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def stats(request):
    halls = Hall.objects.all().count()
    cls_count = Class.objects.all().count()
    dep_count = Department.objects.all().count()
    course_count = Course.objects.all().count()

    return Response({"halls": halls, "classes": cls_count, "departments": dep_count, "courses": course_count})


@api_view(["PATCH"])
def update_hall_blocks(request):
    blocks = HallBlock.objects.all()

    for block in blocks:
        sum = 0
        for hall in block.halls.all():
            sum += hall.working_capacity
        block.size = sum
        block.save()

    return Response({"message": "Done"})


@api_view(['GET'])
def department_view(request):

    if request.method == 'GET':
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'Method not allowed!!!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def department_info_view(request, slug):

    if request.method == 'GET':
        department = Department.objects.get(slug=slug)
        classes = Class.objects.filter(department=department)
        serializer = DepartmentSerializer(department, many=False)
        cls_serializer = ClassSerializer(classes, many=True)
        context = {
            "department": serializer.data,
            "classes": cls_serializer.data
        }
        return Response(context)
    else:
        return Response({'message': 'Method not allowed!!!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def class_view(request):

    if request.method == 'GET':
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'Method not allowed!!!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def course_view(request):

    if request.method == 'GET':
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'Method not allowed!!!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def hall_view(request):

    if request.method == 'GET':
        halls = Hall.objects.all()
        serializer = HallSerializer(halls, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'Method not allowed!!!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET', 'POST'])
def schedule_view(request):

    if request.method == 'GET':
        schedules = Schedule.objects.all()
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'Method not allowed!!!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def department_schedules(request, slug):
    if request.method == "GET":
        schedules = Schedule.objects.filter(
            classe__department__slug=slug).order_by("day")
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'Method not allowed!!!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def upload_department(request):
    data = request.FILES["file"]
    dept = pd.read_csv(data)
    dept = dept.to_dict()
    for key in dept["Code"]:
        try:
            department = Department.objects.get(slug=dept["Code"][key])
        except Department.DoesNotExist:
            department = Department.objects.create(
                name=dept["Name"][key],
                slug=dept["Code"][key]
            )
            department.save()
    return Response({"message": "Success", "ok": True})


@api_view(['POST'])
def upload_halls(request):
    data = request.FILES["file"]
    halls = pd.read_csv(data)
    halls = halls.to_dict()
    for key in halls["LECTURE ROOM"]:
        try:
            hall = Hall.objects.get(name=halls["LECTURE ROOM"][key])
        except Hall.DoesNotExist:
            hall = Hall.objects.create(
                name=halls["LECTURE ROOM"][key],
                capacity=halls["CAPACITY"][key],
                hall_type=halls["TYPE"][key]
            )
            hall.save()
    return Response({"message": "Success", "ok": True})


@api_view(['POST'])
def upload_classes(request, dep_slug):
    data = request.FILES["file"]
    classes = pd.read_csv(data)
    classes = classes.to_dict()
    department = Department.objects.get(slug=dep_slug)
    for key in classes["Class"]:
        level = classes["Class"][key].split(" - ")
        print(level)
        if level[1] == "FULL TIME":
            program = "FT"
        else:
            program = "PT"
        cls = Class.objects.create(
            department=department,
            level=level[0],
            program=program,
            size=classes["Size"][key]
        )
        cls.save()

    return Response({"message": "Done"})


@api_view(['POST'])
def upload_course(request, dep_slug, level):
    data = request.FILES["file"]
    courses = pd.read_csv(data)
    courses = courses.to_dict()
    department = Department.objects.get(slug=dep_slug)
    for key in courses["COURSE CODE"]:
        course, created = Course.objects.get_or_create(
            code=courses["COURSE CODE"][key],
            defaults={
                "department": department,
                "unit": courses["COURSE UNIT"][key],
                "name": courses["COURSE TITLE"][key],
                "exam_type": courses["EXAM TYPE"][key]
            }
        )
        for cl in Class.objects.filter(department=department, level=level):
            cl.courses.add(course)

    return Response({"message": "Done"})


@api_view(['POST'])
def generate_time_table(request):
    classes = Class.objects.all()
    for cl in classes:
        # SPLIT COURSES INTO ALREADY SCHEDULES AND AWAITING SCHEDULES COURSES
        sc_courses, nc_courses = split_courses(cl.courses.all())

        print(len(sc_courses))
        print(len(nc_courses))

        dates = ["01-02-2023", "02-02-2023", "03-02-2023", "04-02-2023", "05-02-2023", "06-02-2023", "07-02-2023",
                 "08-02-2023", "09-02-2023", "10-02-2023", "11-02-2023", "12-02-2023", "13-02-2023", "14-02-2023"]

        # RESCHEDULE THE ALREADY SCHEDULE COURSES FOR NEW CLASS
        schedule_prev(sc_courses, cl, dates)

        # SCHEDULE THE AWAITING COURSES FOR A CLASS
        schedule_next(nc_courses, cl, dates)

    # SAVE OUTPUT TO CSV
    for dep in Department.objects.all():
        sched = Schedule.objects.filter(classe__department=dep)
        save_to_csv(sched, dep=dep.slug)

    serializer = ScheduleSerializer(sched, many=True)
    return Response(serializer.data)

# manage.py drf_create_token <username>
