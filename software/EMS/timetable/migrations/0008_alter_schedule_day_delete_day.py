# Generated by Django 4.1.7 on 2023-04-18 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0007_day_alter_schedule_day'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='day',
            field=models.DateTimeField(),
        ),
        migrations.DeleteModel(
            name='Day',
        ),
    ]
