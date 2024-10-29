from asyncio import constants
from rest_framework import serializers
from ..models import Movie, SGUser
from django.contrib.auth.password_validation import validate_password

class SGUserSerializer(serializers.ModelSerializer):
    favourites = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Movie.objects.all(),
        required=False  # Makes the field optional during creation/update
    )

    class Meta:
        model = SGUser
        fields = ['username', 'email', 'favourites', 'is_superuser',
                  'date_joined', 'image', 'name', 'password', 'telegram_id']

    def create(self, validated_data):
        # Create a new user instance
        user = SGUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate(self, attrs):
        print(attrs)
        user = self.context['request'].user
        old_password = attrs.get('old_password')
        
        if not user.check_password(old_password):
            raise serializers.ValidationError({"old_password": "Old password is incorrect."})
        
        new_password = attrs.get('new_password')
        validate_password(new_password)
        
        return attrs
    
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
