from rest_framework import serializers
from .models import CustomUser ,Profile
from .models import  Community, Post ,Comments,Reply

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
        return {"id": obj.owner.id ,"name":obj.owner.name,"profileImage_url":obj.owner.profileImage_url} if obj.owner else "Unknown"
       
    def get_members(self, obj):
        return [{"id":member.id ,"name": member.name ,"profileImage_url":member.profileImage_url} for member in obj.members.all()] 
     
class JoinCommunitySerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Community
        fields ='__all__'
    
class PostSerializer(serializers.ModelSerializer):
    author  = serializers.SerializerMethodField()
    community = serializers.SerializerMethodField()
    total_likes = serializers.ReadOnlyField()
    saved_by = serializers.SerializerMethodField()

    class Meta():
        model = Post
        fields ='__all__'
        read_only_fields = ['id', 'author', 'community', 'created_at', 'updated_at']

    def get_author(self, obj):
        if isinstance(obj, dict):
            return obj.get("author", {})  
        return {
        "id": obj.author.id, 
        "name": obj.author.name, 
        "profileImage_url": obj.author.profileImage_url
    }
    def get_saved_by(self, obj):
        return [profile.id for profile in obj.saved_by.all()]
    
    def get_community(self, obj):
        return {"id":obj.community.id , "name":obj.community.name, "profileImage_url":obj.community.communityImage_url}
    
     
class CommentsSerializer(serializers.ModelSerializer):
    user= serializers.SerializerMethodField()
    class Meta:
        model = Comments
        fields = ['id', 'comments', 'created_at', 'updated_at','user']
        read_only_fields = ['id', 'post','created_at', 'updated_at','user'] 

    def get_user(self,obj):
        return {"id":obj.user.id,"name":obj.user.name,"profileImage_url":obj.user.profileImage_url}

class ReplySerializer(serializers.ModelSerializer):
    user= serializers.SerializerMethodField()
    class Meta:
        model=Reply
        fields = ['id','replies','created_at','updated_at','user']
        read_only_fields = ['id', 'comment','created_at', 'updated_at','user'] 
    def get_user(self,obj):
        return {"id":obj.user.id,"name":obj.user.name,"profileImage_url":obj.user.profileImage_url}