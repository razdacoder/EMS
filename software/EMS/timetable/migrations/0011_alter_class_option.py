# Generated by Django 4.1.7 on 2023-06-11 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0010_remove_class_name_remove_schedule_semester_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='class',
            name='option',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
    ]
