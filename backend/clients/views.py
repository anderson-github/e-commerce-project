from rest_framework import permissions, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Client


class SignUpView(APIView):
    """
    Sign up view to register new clients in the app.
    """
    permission_classes = (permissions.AllowAny,)

    class Meta:
        abstract = True

    class InputSerializer(serializers.Serializer):
        username = serializers.CharField(required=True)
        email = serializers.EmailField(required=True)
        password = serializers.CharField(min_length=6, required=True)
        firstName = serializers.CharField(required=True, source="first_name")
        lastName = serializers.CharField(required=True, source="last_name")

    class OutputSerializer(InputSerializer):
        password = None
        # accessToken = serializers.CharField(source="access_token")
        # refreshToken = serializers.CharField(source="refresh_token")


    def post(self, request):
        """
        Post view for client registration.
        """
        # Validating input data:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # New client data verification on db:
        if Client.objects.filter(email=serializer.validated_data["email"]).exists():
            return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

        if Client.objects.filter(username=serializer.validated_data["username"]).exists():
            return Response({"error": "Username already registered"}, status=status.HTTP_400_BAD_REQUEST)

        # Everything Ok, then create client:
        client = Client.objects.create_user(**serializer.validated_data)

        # Assigning token pair codes:
        # jwt_tokens = RefreshToken.for_user(client)

        # Response as json file:
        serializer = self.OutputSerializer(
            {
                "username": client.username,
                "email": client.email,
                "first_name": client.first_name,
                "last_name": client.last_name,
                # "accessToken": str(jwt_tokens.access_token),
                # "refreshToken": str(jwt_tokens.refresh_token),
            }
        )
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    Login view for created a clients.
    """

    permission_classes = (permissions.AllowAny,)

    class InputSerializer(serializers.Serializer):
        username = serializers.CharField(required=True)
        password = serializers.CharField(min_length=6, required=True)

    class OutputSerializer(InputSerializer):
        username = serializers.CharField()
        email = serializers.EmailField()
        firstName = serializers.CharField(source="first_name")
        lastName = serializers.CharField(source="last_name")
        accessToken = serializers.CharField(source="access_token")
        refreshToken = serializers.CharField(source="refresh_token")


    def post(self, request):
        """
        Post view for client login.
        """
        # Data validation:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            client = Client.objects.get(username=serializer.validated_data["username"])
        except Client.DoesNotExist:
            return Response({"error": "Username or Password is incorrect"},
                            status=status.HTTP_400_BAD_REQUEST)

        is_password_valid = client.check_password(serializer.validated_data["password"])
        if is_password_valid is False:
            return Response({"error": "Username or Password is incorrect"},)

        # Assigning token pair codes:
        jwt_tokens = RefreshToken.for_user(client)

        # Response to give back:
        serializer = self.OutputSerializer(
            {
                "username": client.username,
                "email": client.email,
                "firstName": client.first_name,
                "lastName": client.last_name,
                "accessToken": str(jwt_tokens.access_token),
                "refreshToken": str(jwt_tokens.refresh_token)
            }
        )
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class MyProfile(APIView):
    """
    Retrieves information about a specific user.
    """

    class OutputSerializer(serializers.Serializer):
        username = serializers.CharField()
        email = serializers.EmailField()
        firstName = serializers.CharField(source="first_name")
        lastName = serializers.CharField(source="last_name")
        dateJoined = serializers.DateField(source="date_joined")


    def get(self, request):
        """ """
        # Returning json response
        serializer = self.OutputSerializer({
            "username": request.user.username,
            "email": request.user.email,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "dateJoined": request.user.date_joined,
        })
        return Response(data=serializer.data, status=status.HTTP_200_OK)


