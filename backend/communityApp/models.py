from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser


class CustomUserManager(BaseUserManager):
    def create_user(self,username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        if not username:
            raise ValueError("The username must be set")
        
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(username=username,email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username,email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True) 

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username,email, password, **extra_fields)
    
class  CustomUser(AbstractUser):

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    objects = CustomUserManager() 

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username;

