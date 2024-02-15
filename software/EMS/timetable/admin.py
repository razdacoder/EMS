from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Department, Class, Course, Hall, Schedule, HallBlock, Distribution, DistributionItem

# UNREGISTER THE GROUP MODEL.
admin.site.unregister(Group)


class ScheduleAdmin(admin.ModelAdmin):
    list_filter = ["day", "period", "classe"]


# REGISTER MODELS TO THE ADMIN
admin.site.register(Department)
admin.site.register(Class)
admin.site.register(Course)
admin.site.register(Hall)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(HallBlock)
admin.site.register(DistributionItem)
admin.site.register(Distribution)
