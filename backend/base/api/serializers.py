from rest_framework import serializers
from ..models import SGUser


class SGUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SGUser
        fields = '__all__'

    def create(self, validated_data):
        # Create a new user instance
        user = SGUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
