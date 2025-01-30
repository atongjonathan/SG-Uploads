from django.contrib import admin
from .models import Movie, SGUser
from import_export.admin import ImportExportModelAdmin

class MovieAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass
# Register your models here.
admin.site.register(SGUser)
admin.site.register(Movie, MovieAdmin)