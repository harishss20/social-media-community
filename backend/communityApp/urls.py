from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginView, UserRegistrationView
from .views import ProfileView ,CreateCommunityView,JoinCommunityView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/',ProfileView.as_view(), name ='profile'),
    path('community/',CreateCommunityView.as_view(),name='community'),
    path('join-community/',JoinCommunityView.as_view(),name="join_community"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


