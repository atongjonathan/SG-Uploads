from django.contrib import admin
from .models import Movie, SGUser

# Register your models here.
admin.site.register(SGUser)
admin.site.register(Movie)