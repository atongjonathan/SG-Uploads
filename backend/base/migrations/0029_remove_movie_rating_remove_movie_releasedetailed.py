# Generated by Django 4.2.16 on 2025-04-09 07:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0028_auto_20250409_0958'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movie',
            name='rating',
        ),
        migrations.RemoveField(
            model_name='movie',
            name='releaseDetailed',
        ),
    ]
