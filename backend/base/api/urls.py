from . import views
from django.urls import path
from .views import MyTokenObtainView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path("", views.get_routes),
    path('token/', MyTokenObtainView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users', views.users_list, name="users"),
    path('create-user', views.create_user, name="create_user"),
    path('update-user/<pk>', views.update_user, name="update_user"),
    path('users/<pk>', views.users, name="user")

]
