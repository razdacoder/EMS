# Generated by Django 4.1.7 on 2023-03-29 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0002_remove_schedule_classe_remove_schedule_department_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hall',
            old_name='size',
            new_name='capacity',
        ),
        migrations.AddField(
            model_name='hall',
            name='hall_type',
            field=models.CharField(choices=[('Small', 'Small'), ('medium', 'Medium'), ('Large', 'Large')], default=('Small', 'Small'), max_length=50),
        ),
    ]