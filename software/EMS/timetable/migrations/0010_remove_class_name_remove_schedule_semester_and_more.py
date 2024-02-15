# Generated by Django 4.1.7 on 2023-06-11 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0009_alter_schedule_day'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='class',
            name='name',
        ),
        migrations.RemoveField(
            model_name='schedule',
            name='semester',
        ),
        migrations.AddField(
            model_name='class',
            name='option',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='period',
            field=models.CharField(choices=[('AM', 'AM'), ('PM', 'PM')], max_length=50),
        ),
    ]