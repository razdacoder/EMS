
from django.contrib import admin
from rest_framework.authtoken import views
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/login/', views.obtain_auth_token),
    path("api/v1/", include("timetable.urls"))
]
