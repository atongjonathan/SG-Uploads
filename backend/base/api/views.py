from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from ..models import Movie, SGUser
from .serializers import MovieSerializer, SGUserSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token


class MyTokenObtainView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users_list(request):
    users = SGUser.objects.all()
    serializer = SGUserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def movies_list(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user(request):
    serializer = SGUserSerializer(request.user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_user(request):
    serializer = SGUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_movie(request):
    serializer = MovieSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def update_user(request):
    try:
        # Retrieve the uploaded image file
        image = request.FILES.get('image')
        username = request.data.get('username')
        email = request.data.get('email')

        # Validate the data
        if not username or not email:
            return Response({"error": "Username and email are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Update the current user's profile
        user = request.user  # Since SGUser extends AbstractUser, this is already an SGUser instance

        if image:
            user.image = image  # Update the image if provided
        user.username = username  # Update the username
        user.email = email  # Update the email
        user.save()  # Save the changes

        return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_movie(request, id):
    """
    Allows an authenticated user to like a movie.
    """
    try:
        movie = Movie.objects.get(pk=id)
    except Movie.DoesNotExist:
        return Response({"error": "Movie not found."}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if user.favourites.filter(pk=id).exists():
        return Response({"message": "You have already liked this movie."}, status=status.HTTP_400_BAD_REQUEST)

    user.favourites.add(movie)
    return Response({"message": "Movie liked successfully."}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_movie(request, id):
    """
    Allows an authenticated user to unlike a movie.
    """
    try:
        movie = Movie.objects.get(pk=id)
    except Movie.DoesNotExist:
        return Response({"error": "Movie not found."}, status=status.HTTP_404_NOT_FOUND)

    user = request.user

    if not user.favourites.filter(pk=id).exists():
        return Response({"message": "You have not liked this movie yet."}, status=status.HTTP_400_BAD_REQUEST)

    user.favourites.remove(movie)
    return Response({"message": "Movie unliked successfully."}, status=status.HTTP_200_OK)
