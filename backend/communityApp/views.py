from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
from .serializers import UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()
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
        print(request)
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
            return Response({"error": "Username filed is empty"}, status=status.HTTP_400_BAD_REQUEST)

            
            
