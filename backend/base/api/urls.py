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
    path('users', views.UserViewSet.as_view(), name="users"),
    path('movies', views.MinMovieList.as_view(), name="movies"),
    path('movies/<int:id>/', views.MovieList.as_view(), name='movie-detail-by-id'),
    path('movies/title/<str:title>/', views.MovieList.as_view(), name='movie-detail-by-title'),
    path('history/<int:pk>', views.HistoryView.as_view(), name="history"),
    path('history', views.HistoryCreateView.as_view(), name="new_history"),
    path('create-user', views.create_user, name="create_user"),
    path('create-movie', views.create_movie, name="create_movie"),
    path('update-user', views.update_user, name="update_user"),
    path('user', views.user, name="user"),
    path('users/me/', views.CurrentUserView.as_view()),
    path('like/<id>', views.like_movie, name='like_movie'),
    path('unlike/<id>', views.unlike_movie, name='unlike_movie'),
    path('edit/<id>', views.edit_movie, name='edit'),
    path('captions', views.captions, name='captions'),
    path('search', views.search_captions, name='search_captions'),
    path('itunes', views.search_itunes, name='search'),
    path('change-password', views.change_password, name='password'),
    path('verify', views.send_verify_token),
    path('send_reset_token', views.send_reset_token),
    path('clear_cache', views.clear_cache),
    path('verify_email/<uidb64>/<token>', views.verify_email),
    path('verify_reset_password/<user>/<uidb64>/<token>', views.verify_reset_password),
    path('reset_password', views.reset_password),
    path('trending', views.TrendingList.as_view()),
    path('pesapal/iframe', views.iframe_src),
    path('webpush/save_information/', views.save_subscription),



] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
