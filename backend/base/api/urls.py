from django.conf import settings
from . import views
from django.urls import path
from .views import MyTokenObtainView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.conf.urls.static import static


urlpatterns = [
    path("", views.get_routes),
    path('token/', MyTokenObtainView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users', views.users_list, name="users"),
    path('movies', views.movies_list, name="movies"),
    path('create-user', views.create_user, name="create_user"),
    path('create-movie', views.create_movie, name="create_movie"),
    path('update-user', views.update_user, name="update_user"),
    path('user', views.user, name="user"),
    path('like/<id>', views.like_movie, name='like_movie'),
    path('unlike/<id>', views.unlike_movie, name='unlike_movie'),
    path('captions', views.captions, name='captions'),
    path('itunes', views.search_itunes, name='search'),
    path('change-password', views.change_password, name='password')


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
