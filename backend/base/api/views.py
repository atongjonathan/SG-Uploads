import json
import logging
import requests
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes, parser_classes
from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime
from ..captions import Captions
from ..models import Movie, SGUser
from .serializers import MovieSerializer, SGUserSerializer,  ChangePasswordSerializer, SubtitleSerializer
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import os
from rest_framework import generics, filters
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.password_validation import validate_password
from django.core.mail import EmailMultiAlternatives

cc = Captions()


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


class MovieList(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    search_fields = ['title', 'id']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    def get_queryset(self):
        queryset = Movie.objects.all()
        genre = self.request.query_params.get('genre')
        title = self.request.query_params.get('title')
        id = self.request.query_params.get('id')
        year = self.request.query_params.get('year')
        releaseLocation = self.request.query_params.get('releaseLocation')

        if genre:
            queryset = queryset.filter(genre__icontains=genre)
        if title:
            queryset = queryset.filter(title__icontains=title)
        if id:
            queryset = queryset.filter(id=id)
        if year:
            queryset = queryset.filter(year=year)
        if releaseLocation:
            queryset = queryset.filter(releaseLocation=releaseLocation)

        return queryset


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
    data = request.data
    data["rating_star"] = data["rating"]["star"]
    data["rating_count"] = data["rating"]["count"]
    data["wins"] = data["award"]["wins"]
    data["nominations"] = data["award"]["nominations"]
    data["releaseLocation"] = data["releaseDetailed"]["releaseLocation"]["country"]
    date = data["releaseDetailed"]["date"]
    data["releaseDate"] = datetime.fromisoformat(
        date.replace("Z", "+00:00")).date()
    serializer = MovieSerializer(data=data)
    if serializer.is_valid():
        if settings.DEVELOPMENT != "True":
            updated = cc.update_group(request.data)
            if not updated.get("success"):
                logging.info(json.dumps(updated, indent=4))
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
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
def edit_movie(request: HttpRequest, id):
    movie = Movie.objects.get(pk=id)
    print(request.data)
    serializer = MovieSerializer(
        movie, data=request.data, partial=True)  # Use partial update
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
def search_captions(request):
    try:
        imdb_id = request.data.get("imdb_id")
        if not imdb_id:
            return Response({"error": "IMDb ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Search for subtitles and get the file path
        result_data = cc.search(imdb_id=imdb_id)
        serializer = SubtitleSerializer(data=result_data, many=True)

        if serializer.is_valid() or serializer.data:
            return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def captions(request):
    try:
        user = request.user
        # Search for subtitles and get the file path
        file_path = cc.download(request.data)

        if "error" in file_path:
            return Response(file_path, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the file path is absolute
        absolute_path = os.path.abspath(file_path)

        # Send the file to Telegram
        if not hasattr(user, "telegram_id") or not user.telegram_id:
            return Response({"error": "User does not have a Telegram ID"}, status=status.HTTP_400_BAD_REQUEST)

        response = cc.send_to_tg(user.telegram_id, absolute_path)

        if type(response) == int:
            return Response({"success": response}, status=status.HTTP_200_OK)
        else:

            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Return a string representation of the error
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def send_emails(subject: str, body: str, recipients: list):
    message = EmailMultiAlternatives(
        to=recipients, from_email=settings.DEFAULT_FROM_EMAIL, subject=subject)
    message.attach_alternative(body, "text/html")
    try:
        message.send(fail_silently=False)
        return Response({"message": "Success"}, headers={'Content-Type': 'application/json'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"errors": str(e)}, headers={'Content-Type': 'application/json'}, status=status.HTTP_501_NOT_IMPLEMENTED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def send_verify_token(request: HttpRequest):
    token = default_token_generator.make_token(request.user)
    uidb64 = urlsafe_base64_encode(force_bytes(request.user.email))
    url = f'{settings.FRONTEND_URL.replace("host.docker.internal", "localhost")}/verify/{uidb64}/{token}/'
    data = "Follow this link to verify your email: \n" + url
    return send_emails("Verify your email address", data, [request.user.email])


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verify_email(request: HttpRequest, uidb64, token):
    user = request.user
    try:
        email = force_str(urlsafe_base64_decode(uidb64))
        logging.info("Verifying" + user.email)
        token_valid = default_token_generator.check_token(
            user=user, token=token)
        if email == request.user.email and token_valid:
            user.is_verified = True
            user.save()
            return Response({"success": "Account verified"}, status=status.HTTP_200_OK, content_type="application/json")
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")
    return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")
