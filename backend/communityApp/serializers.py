from rest_framework import serializers
from .models import CustomUser ,Profile
from .models import  Community, Post ,Comments


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username','email', 'password', 'confirm_password']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        username = validated_data.get('username') 
        email = validated_data.get('email')
        password = validated_data.get('password')
        user = CustomUser.objects.create_user(username=username, email=email, password=password)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(format='hex_verbose')
    community_created=serializers.SerializerMethodField()
    community_joined= serializers.SerializerMethodField()
 
   
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields=['id','name','date_joined','user','community_created']

    def get_community_created(self, obj):
        print(obj.id)
        return Community.objects.filter(owner=obj).count()
        
    def get_community_joined(self, obj):
        profile= Profile.objects.get(id=obj.id)
        return profile.communities_joined.all().count() 
    

 

class CreateCommunitySerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()
    
    
    class Meta:
        model = Community
        fields = '__all__'
        read_only_fields=['id','created_at','owner','members']

    def get_owner(self, obj):
        return {"id": obj.owner.id ,"profileImage_url":obj.owner.profileImage_url,"name":obj.owner.name} if obj.owner else "Unknown"
       
    def get_members(self, obj):
        return [{"id":member.id ,"profileImage_url":member.profileImage_url,"name": member.name } for member in obj.members.all()] 
     
   
    
    
   
class JoinCommunitySerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Community
        fields ='__all__'
    

class PostSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only= True)
    community = serializers.SlugRelatedField(
        queryset=Community.objects.all(), 
        slug_field='name'  
    )
    total_likes = serializers.ReadOnlyField()

    class Meta():
        model = Post
        fields ='__all__'
        read_only_fields = ['id', 'author', 'community', 'created_at', 'updated_at'] 

class CommentsSerializer(serializers.ModelSerializer):
    user= serializers.SerializerMethodField();
    class Meta:
        model = Comments
        fields = ['id', 'comments', 'created_at', 'updated_at']
        read_only_fields = ['id', 'post','created_at', 'updated_at','user'] 

    def get_user(self,obj):
        return {obj}

    