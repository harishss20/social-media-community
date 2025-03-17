from uuid import UUID
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .permissions import IsAuthorOrReadOnly,IsOwnerOrReadOnly, IsAuthenticatedForCreation
from rest_framework.permissions import IsAuthenticatedOrReadOnly,AllowAny, IsAuthenticated
from .serializers import LoginSerializer, UserRegistrationSerializer ,ProfileSerializer ,CreateCommunitySerializer, JoinCommunitySerializer, PostSerializer
from .models import Profile ,Community, Post
import random
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
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password) 
            if user:
                profile = user.profile
                show_join_communities = not profile.user_status
                if show_join_communities:
                    profile.user_status = True
                    profile.save() 
                tokens = get_tokens_for_user(user)
                return Response({
                    "message": "Login successful",
                    "tokens": tokens,

                    "user_status":show_join_communities,
                    "user_id": str(profile.id)
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Password is wrong "}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
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
    permission_classes = [IsOwnerOrReadOnly]

    def get(self, request):       
        user_id = request.query_params.get('id', None);
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        profile = get_object_or_404(Profile, id=user_id)
        profile_serializer = ProfileSerializer(profile)
       
        return Response({
            "profile": profile_serializer.data,
        }, status=status.HTTP_200_OK)
    
    def patch(self, request):
        id = request.query_params.get('id', None)
        if id:
            try:
                profile = Profile.objects.get(id=id)
            except Profile.DoesNotExist:
                return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = ProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Profile ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        

class CreateCommunityView(APIView):

    permission_classes = [IsAuthenticatedForCreation]

    def get(self, request):
        community_name = request.query_params.get('name')
        if community_name:
            community = Community.objects.filter(name=community_name).first()
            if community:
                serializer = CreateCommunitySerializer(community)
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Community is not exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "community names is required"}, status=status.HTTP_400_BAD_REQUEST)
      
    def post(self, request):
        #gets all the community based on category
        community_based_on=request.data.get('category')
        print(community_based_on)
        if community_based_on:
            communities=Community.objects.filter(community_based_on__startswith=community_based_on)
            if communities:
                serializer=JoinCommunitySerializer(communities, many=True)
                return Response({'data':serializer.data},status=status.HTTP_200_OK)
        
        #To create community
        serializer = JoinCommunitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "community is created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        user_id = request.query_params.get('id',None)
        community_name = request.data.get('name', None)

        if community_name:
            try:
                community = Community.objects.get(name=community_name)
            except Community.DoesNotExist:
                return Response({"error": "Community not found"}, status=status.HTTP_404_NOT_FOUND)
            
            user_uuid= UUID(user_id)
            
            if not user_id or str(community.owner.id) != str(user_uuid):
                    return Response({"error":"Owner has the access to Edit"},status=status.HTTP_401_UNAUTHORIZED)   
            
            serializer = CreateCommunitySerializer(community, data=request.data, partial=True)  
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Community is updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Community name is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        user_id=request.data.get('user_id',None)
        community_name = request.data.get('name',None)
        if community_name:
            try:
                community = Community.objects.get(name=community_name)
            except Community.DoesNotExist:
                return Response({"error": "Community not found"}, status=status.HTTP_404_NOT_FOUND)
         
            user_uuid = UUID(user_id)
            if str(community.owner.id) != str(user_uuid):
                return Response({"error": "Owner has the access to Delete Community"}, status=status.HTTP_401_UNAUTHORIZED)
            
            community.delete()
            return Response({"message":"community deleted successfully"},status=status.HTTP_200_OK)
                

class ProfileBasedCommunityView(APIView):

    def get(self, request):
        user_id = request.query_params.get('id')
        if user_id:
            community = Community.objects.filter(owner_id=user_id)
            print(community)
            if community:
                serializer = JoinCommunitySerializer(community, many=True)
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "User Does not joined Any Community"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "community Id is required"}, status=status.HTTP_400_BAD_REQUEST)
      
class userJoinedCommunityView(APIView):
    def get(self, request):
        user_id= request.query_params.get('id')
                   
        if user_id:
            profile = get_object_or_404(Profile, id=user_id)
            community = profile.communities_joined.all()

            if community:
                serializer= CreateCommunitySerializer(community, many=True)
                return Response({"joined_community":serializer.data},status=status.HTTP_200_OK)

        else:
            return Response({"error": "User Id is required"}, status=status.HTTP_400_BAD_REQUEST)


        

            

class JoinCommunityView(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self,request):
        
            items= list(Community.objects.all())
            random_items=random.sample(items,3);
            if random_items:
                serializer = JoinCommunitySerializer(random_items , many=True)
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Community is not exists"}, status=status.HTTP_400_BAD_REQUEST)
       

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
    
    def patch(self, request):
        user_id= request.data.get("user_id");
        community_name = request.data.get("community_name")    

        if not user_id or not community_name:
            return Response({"error": "User ID and Community ID are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        profile = get_object_or_404(Profile, id=user_id)
        community = get_object_or_404(Community, name=community_name)
        community.members.remove(profile)
        community.save()

        return Response({"message": f"{profile.name} has Leaved {community.name}."}, status=status.HTTP_200_OK)
        

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


    def perform_create(self, serializer):
        serializer.save(author = self.request.user.profile)

class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(author = self.request.user.profile)

class LikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            data = request.data
            action = data.get('action')

            if action == 'like':
                post.likes_count+=1
            elif action == 'unlike':
                if post.likes_count > 0:
                    post.likes_count -= 1
            
            post.save()
            return Response({'likes_count':post.likes_count},status=status.HTTP_200_OK)
        
        except Post.DoesNotExist:
            return Response({'error':'Post not found'},status = status.HTTP_404_NOT_FOUND)
        
class ToggleSavePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, id = pk)
        profile = request.user.profile

        if post.saved_by.filter(id=profile.id).exists():
            post.unsave_post(profile)
            action = 'unsaved'

        else:
            post.save_post(profile)
            action = 'saved'

        return JsonResponse({'status':action})
    
class SavedPostsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        profile = get_object_or_404(Profile, id=pk)
        saved_posts = profile.get_saved_posts()
        serializer = PostSerializer(saved_posts, many=True, context={'request':request})
        return JsonResponse(serializer.data, safe=False)


    



