from django.urls import path
from .views import department_view, class_view, course_view, hall_view, schedule_view, upload_department, upload_halls, upload_classes, upload_course, generate, distribute_halls, update_hall_blocks, random_classes, stats, department_schedules, department_info_view, get_distribution, get_dates

urlpatterns = [
    path("departments/", department_view,),
    path("dates/", get_dates),
    path("department/<str:slug>/", department_info_view),
    path("schedules/<str:slug>/", department_schedules,),
    path("classes/", class_view, ),
    path("statistics/", stats),
    path("courses/", course_view, ),
    path("halls/", hall_view, ),
    path("schedule/", schedule_view, ),
    path("distribute/<str:day>/<str:period>/", distribute_halls),
    path("distribution/<str:day>/<str:period>/", get_distribution),
    path("randomcls/", random_classes),
    path("update/", update_hall_blocks),
    path("generate/", generate),
    path("upload-dep/", upload_department),
    path("upload-halls/", upload_halls),
    path("upload-classes/<slug:dep_slug>/", upload_classes),
    path("upload-course/<slug:dep_slug>/<str:level>/", upload_course),
]
