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
                  'date_joined', 'image', 'name', 'is_verified', 'telegram_id']

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


from rest_framework import serializers

class SubtitleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    type = serializers.CharField(max_length=255)
    subtitle_id = serializers.CharField(max_length=255)
    language = serializers.CharField(max_length=255)
    download_count = serializers.IntegerField()
    new_download_count = serializers.IntegerField()
    hearing_impaired = serializers.BooleanField()
    hd = serializers.BooleanField()
    fps = serializers.FloatField()
    votes = serializers.IntegerField()
    ratings = serializers.FloatField()
    from_trusted = serializers.BooleanField()
    foreign_parts_only = serializers.BooleanField()
    upload_date = serializers.DateTimeField()
    ai_translated = serializers.BooleanField()
    machine_translated = serializers.BooleanField()
    release = serializers.CharField(max_length=255)
    comments = serializers.CharField(max_length=255, required=False)
    legacy_subtitle_id = serializers.CharField(max_length=255, required=False)
    
    uploader_id = serializers.IntegerField()
    uploader_name = serializers.CharField(max_length=255)
    uploader_rank = serializers.CharField(max_length=255)

    feature_id = serializers.IntegerField()
    feature_type = serializers.CharField(max_length=255)
    year = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    movie_name = serializers.CharField(max_length=255)
    imdb_id = serializers.CharField(max_length=255)
    tmdb_id = serializers.CharField(max_length=255)
    season_number = serializers.IntegerField()
    episode_number = serializers.IntegerField()
    parent_imdb_id = serializers.CharField(max_length=255)
    parent_title = serializers.CharField(max_length=255)
    parent_tmdb_id = serializers.CharField(max_length=255)
    parent_feature_id = serializers.IntegerField()

    url = serializers.URLField()
    related_links = serializers.ListField(child=serializers.URLField())
    files = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField(max_length=255)
        ), required=False
    )
    
    file_id = serializers.CharField(max_length=255, required=False)
    file_name = serializers.CharField(max_length=255, required=False)

    # Nested serializer for uploader details (optional)
    uploader = serializers.DictField(
        child=serializers.CharField(max_length=255), required=False
    )
    
    # Nested serializer for feature details (optional)
    feature_details = serializers.DictField(
        child=serializers.CharField(max_length=255), required=False
    )