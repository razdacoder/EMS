from rest_framework.serializers import ModelSerializer
from .models import Department, Class, Course, Hall, Schedule, Distribution, DistributionItem


class DepartmentSerializer(ModelSerializer):

    class Meta:
        model = Department
        fields = '__all__'


class ClassSerializer(ModelSerializer):

    class Meta:
        model = Class
        fields = '__all__'
        depth = 1


class CourseSerializer(ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'


class HallSerializer(ModelSerializer):

    class Meta:
        model = Hall
        fields = '__all__'


class ScheduleSerializer(ModelSerializer):

    class Meta:
        model = Schedule
        fields = '__all__'
        depth = 1


class DistributionClass(ModelSerializer):
    class Meta:
        model = Class
        fields = ["name"]


class DistributionCourse(ModelSerializer):
    class Meta:
        model = Course
        fields = ["code"]


class DistributionHall(ModelSerializer):
    class Meta:
        model = Hall
        fields = ["name", "working_capacity"]


class DistributionSchedule(ModelSerializer):
    classe = DistributionClass()
    course = DistributionCourse()

    class Meta:
        model = Schedule
        fields = ["classe", "course"]


class DistributionItemSerializer(ModelSerializer):
    schedule = DistributionSchedule()

    class Meta:
        model = DistributionItem
        fields = ["schedule", "no_of_students"]


class DistributionSerializer(ModelSerializer):
    items = DistributionItemSerializer(many=True)
    hall = DistributionHall()

    class Meta:
        model = Distribution
        fields = ["id", "hall", "day", "period", "items"]
