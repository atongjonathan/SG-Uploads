import requests
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes, parser_classes
from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, permissions
from ..captions import search, send_to_tg, update_group
from ..models import Movie, SGUser
from .serializers import MovieSerializer, SGUserSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser
import os
from .serializers import ChangePasswordSerializer


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
def search_itunes(request):
    term = request.GET.get("search")
    reqUrl = f"https://itunes.apple.com/search?term={term}&entity=movie&media=movie"
    headersList = {
        "Accept": "*/*",
    }

    payload = ""

    response = requests.request(
        "GET", reqUrl, data=payload,  headers=headersList)
    return Response(response.json(), status=status.HTTP_200_OK)


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
        updated = update_group(request.data)
        if updated.get("success"):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(updated, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def update_user(request: HttpRequest):
    user = request.user  # Get the authenticated user
    if (request.data.get("name")):
        user.name = request.data.get("name")
        user.save()
    serializer = SGUserSerializer(
        user, data=request.data, partial=True)  # Use partial update

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(
        data=request.data, context={'request': request})
    if serializer.is_valid():
        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(["POST"])
@permission_classes([IsAdminUser])
def captions(request):
    # try:
        user = request.user
        imdb_id = request.data.get("imdb_id")

        if not imdb_id:
            return Response({"error": "IMDb ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Search for subtitles and get the file path
        file_path = search(imdb_id)

        if "error" in file_path:
            return Response(file_path, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the file path is absolute
        absolute_path = os.path.abspath(file_path)

        # Send the file to Telegram
        if not hasattr(user, "telegram_id") or not user.telegram_id:
            return Response({"error": "User does not have a Telegram ID"}, status=status.HTTP_400_BAD_REQUEST)

        response = send_to_tg(user.telegram_id, absolute_path)

        if type(response) == int:
            return Response({"success": response}, status=status.HTTP_200_OK)
        else:

            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # except Exception as e:
    #     # Return a string representation of the error
    #     return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
