from rest_framework import serializers
from ..models import Movie, SGUser


class SGUserSerializer(serializers.ModelSerializer):
    favourites = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Movie.objects.all(),
        required=False  # Makes the field optional during creation/update
    )
    class Meta:
        model = SGUser
        fields = ['username', 'email', 'favourites', 'is_superuser', 'date_joined', 'image']

    def create(self, validated_data):
        # Create a new user instance
        user = SGUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
    
class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'

    def create(self, validated_data):
        # Create a new user instance
        movie = Movie.objects.create(
            **validated_data
        )
        return movie

