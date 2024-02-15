# Generated by Django 4.1.7 on 2023-10-31 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0018_distribution_distributionitem_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='distribution',
            name='items',
        ),
        migrations.AddField(
            model_name='distribution',
            name='items',
            field=models.ManyToManyField(to='timetable.distributionitem'),
        ),
    ]