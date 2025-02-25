from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer, UserRegistrationSerializer ,ProfileSerializer ,CreateCommunitySerializer, JoinAsMemberCommunitySerializer
from .models import Profile ,Community

from django.shortcuts import get_object_or_404
 
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

def index(request):
    return JsonResponse({"message": "Hello from API!"})

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password) 

            if user:
                tokens = get_tokens_for_user(user)
                return Response({
                    "message": "Login successful",
                    "tokens": tokens
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Password is wrong "}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegistrationView(APIView):
    def post(self, request):
    
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        username = request.query_params.get('username', None)
        if username :
            exist = User.objects.filter(username=username).exists()
            if exist:
                return Response({"message": False}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"message":True}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Username field is empty"}, status=status.HTTP_400_BAD_REQUEST)

            

class ProfileView(APIView):

    
    # def get(self, request):
    #     profiles = Profile.objects.all()
    #     serializer= ProfileSerializer(profiles , many=True)
    #     return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def get(self, request):
        id = request.query_params.get('id', None)
        print(id)
        if id:
            profile = Profile.objects.filter(id=id).first()
            if profile:
                serializer = ProfileSerializer(profile)
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "user is not register"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)


class CreateCommunityView(APIView):
    
    def get(self, request):
        community_name = request.query_params.get('name')
        print(community_name)
        if community_name:
            community = Community.objects.filter(name=community_name).first()
            if community:
                serializer = CreateCommunitySerializer(community)
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Community name is not exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "community Id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        serializer = JoinAsMemberCommunitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "community is created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JoinCommunityView(APIView):
    def post(self, request):
        user_id= request.data.get("user_id");
        community_name = request.data.get("community_name")    

        if not user_id or not community_name:
            return Response({"error": "User ID and Community ID are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        profile = get_object_or_404(Profile, id=user_id)
        community = get_object_or_404(Community, name=community_name)

        if profile in community.members.all():
            return Response({"message": "User is already a member of this community."}, status=status.HTTP_200_OK)
        
        community.members.add(profile)
        community.save()

        return Response({"message": f"{profile.name} has joined {community.name}."}, status=status.HTTP_200_OK)

