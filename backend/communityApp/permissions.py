
from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request,view, obj):
       
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user.profile
    
    from rest_framework.permissions import BasePermission, SAFE_METHODS

from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
       
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        print(f"Request User: {request.user}")
        print(f"Profile User: {obj.user}")
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user



class IsAuthenticatedForCreation(permissions.BasePermission):

    def has_permission(self, request, view):

        if request.method == "GET":
            return True
        
        return request.user and request.user.is_authenticated

