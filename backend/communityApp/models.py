import uuid
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
        return self.username

class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True, null=True)
    profileImage_url = models.URLField(default="https://res.cloudinary.com/dttdxreiq/image/upload/v1740721608/x4nd59qhqts2l670xzwx.png")
    bannerImage_url = models.URLField(default="https://res.cloudinary.com/dttdxreiq/image/upload/v1740691299/vlcgkfx6ul17fvokugpv.png")
    date_joined = models.DateField(auto_now_add=True, null=True)
    user_status = models.BooleanField(default=False)
    saved_posts = models.ManyToManyField('Post',related_name='saved_by',blank=True)


    
    def __str__(self):
        return f"{self.user.username}'s Profile"
    
    def get_saved_posts(self):
        return self.saved_posts.all()

class Community(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField(blank=True, null=True)
    community_based_on = models.CharField(max_length=50,blank=True, null=True)
    rules = models.TextField(max_length=500, blank=True, null=True)
    members = models.ManyToManyField(Profile, related_name="communities_joined", blank=True)  
    communityImage_url = models.URLField(default="https://res.cloudinary.com/dttdxreiq/image/upload/v1740721608/x4nd59qhqts2l670xzwx.png")
    bannerImage_url = models.URLField(default="https://res.cloudinary.com/dttdxreiq/image/upload/v1740691299/vlcgkfx6ul17fvokugpv.png")
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="communities_created")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='posts')
    community = models.ForeignKey(Community, on_delete=models.CASCADE,related_name='posts')
    title = models.CharField(max_length=300)
    text_field = models.TextField(max_length=1000)
    media_file = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes_count = models.IntegerField(default = 0)
    dislikes_count = models.IntegerField(default = 0)
    likes = models.ManyToManyField(Profile, related_name='liked_posts', blank=True)
    dislikes = models.ManyToManyField(Profile, related_name='disliked_posts', blank=True)
    shares = models.ManyToManyField(Profile, related_name='shared_posts', blank=True)

    def __str__(self):
        return self.title
    
    def save_post(self, profile):
        self.saved_by.add(profile)

    def unsave_post(self, profile):
        self.saved_by.remove(profile)
    
    

class Comments(models.Model):
    id =models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post=models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user=models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments')
    comments=models.TextField(max_length=200 ,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name}'s Comments"
    
class Reply(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    comment= models.ForeignKey(Comments, on_delete=models.CASCADE, related_name='replies')
    user= models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='replies')
    replies=models.TextField(max_length=200)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name}'s Replies"


    

