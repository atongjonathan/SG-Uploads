from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Movie(models.Model):

    # Basic Information
    title = models.CharField(max_length=255, unique=True)
    plot = models.TextField()
    poster = models.CharField(max_length=200)
    link = models.URLField(blank=True, null=True)
    isReleased = models.BooleanField(default=False)
    isSeries = models.BooleanField(default=False)
    year = models.PositiveIntegerField(validators=[MinValueValidator(1800), MaxValueValidator(2100)])
    productionStatus = models.CharField(max_length=100, blank=True, null=True)
    
    # Content Details
    contentRating = models.CharField(max_length=10, blank=True, null=True)
    contentType = models.CharField(max_length=50, blank=True, null=True)
    runtime = models.CharField(max_length=20, blank=True, null=True)  # e.g., "2h 30m"
    runtimeSeconds = models.PositiveIntegerField(blank=True, null=True)
    releaseDetailed = models.JSONField(blank=True, null=True)
    releaseDate = models.DateField(blank=True, null=True)  # If different from releaseDetailed
    
    # Ratings and Reviews
    rating = models.JSONField( blank=True, null=True)
    reviews = models.JSONField(blank=True, null=True)  # Could be JSON or plain text
    
    # Multimedia
    images = models.JSONField(blank=True, null=True)  # URLs or paths to additional images
    
    # Language and Locations
    spokenLanguages = models.JSONField(blank=True, null=True)  # List of languages
    filmingLocations = models.JSONField(blank=True, null=True)  # List of locations
    
    # Credits
    actors = models.JSONField(blank=True, null=True)  # List of actor names
    actors_v2 = models.JSONField(blank=True, null=True)  # Additional actor information
    directors = models.JSONField(blank=True, null=True)  # List of director names
    directors_v2 = models.JSONField(blank=True, null=True)  # Additional director information
    writers = models.JSONField(blank=True, null=True)  # List of writer names
    writers_v2 = models.JSONField(blank=True, null=True)  # Additional writer information
    creators = models.JSONField(blank=True, null=True)  # List of creator names
    creators_v2 = models.JSONField(blank=True, null=True)  # Additional creator information
    top_credits = models.JSONField(blank=True, null=True)  # Top billing credits
    
    # Genres and Awards
    genre = models.JSONField(blank=True, null=True)  # List of genres
    award = models.JSONField(blank=True, null=True)  # List of awards won
    
        # Additional Fields
    # Add any additional fields as necessary

    def __str__(self):
        return f"{self.title} ({self.year})"

class SGUser(AbstractUser):
    email = models.EmailField(unique=True)
    favourites = models.ManyToManyField(Movie, related_name='favourites', blank=True)

    def __str__(self) -> str:
        return f"{self.username} User"    