from rest_framework import serializers
from .models import CustomUser ,Profile
from .models import  Community


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
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields=['id','name','date_joined','user']


class CreateCommunitySerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()
    
    class Meta:
        model = Community
        fields = '__all__'
        read_only_fields=['id','created_at','owner','members','name']

    def get_owner(self, obj):
        return obj.owner.name if obj.owner else "Unknown"
       
    def get_members(self, obj):
        return [member.name for member in obj.members.all()] 
   

    
class JoinAsMemberCommunitySerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Community
        fields ='__all__'
    

   