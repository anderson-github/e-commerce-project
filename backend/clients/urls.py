from django.urls import include, path
from clients import views


urlpatterns = [
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('my-profile/', views.MyProfile.as_view(), name='my-profile'),
]
