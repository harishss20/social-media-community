from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginView, UserRegistrationView
from .views import ProfileView ,CreateCommunityView,JoinCommunityView, PostListCreateView, LikePostView,ToggleSavePostView,SavedPostsView, HomePagePostView, GenerateShareLinkAPIView
from .views import PostRetrieveUpdateDestroyView,ProfileBasedCommunityView
from .views import userJoinedCommunityView,CommentsView,CommentsEditOrDeleteView,ReplyView
from .views import ReplyEditOrDeleteView
urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/',ProfileView.as_view(), name ='profile'),
    path('community/',CreateCommunityView.as_view(),name='community'),
    path('join-community/',JoinCommunityView.as_view(),name="join_community"),
    path('user-joined-community/',userJoinedCommunityView.as_view(),name="joined-community"),
    path('user-created-community/',ProfileBasedCommunityView.as_view(),name="joined_community"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<uuid:pk>/', PostRetrieveUpdateDestroyView.as_view(), name='post-detail'),
    path('posts/<uuid:pk>/like/', LikePostView.as_view(), name='like-post'),
    path('posts/<uuid:pk>/toggle-save/', ToggleSavePostView.as_view(), name='toggle-save-post'),
    path('profile/<uuid:pk>/saved-posts/', SavedPostsView.as_view(), name='saved-posts'),
    path('post/<uuid:pk>/share/', GenerateShareLinkAPIView.as_view(), name='generate-share-link'),
    path('feed/', HomePagePostView.as_view(), name='feed-page'),
    path('posts/comments/', CommentsView.as_view(), name='comments-list'),
    path('posts/<uuid:post_id>/comments/', CommentsView.as_view(), name='get-comments'),
    path('posts/comments/<uuid:comments_id>/',CommentsEditOrDeleteView.as_view(),name='edit-comments') ,
    path('comments/<uuid:comments_id>/',ReplyView.as_view(),name="replies"),
    path('comments/reply/<uuid:reply_id>/',ReplyEditOrDeleteView.as_view(),name="edit-replies")
    
]