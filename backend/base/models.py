from django.db import models
from django.contrib.auth.models import AbstractUser


class SGUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self) -> str:
        return f"{self.username} User"

