# Generated by Django 4.2.16 on 2025-04-05 20:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_movie_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='created',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
