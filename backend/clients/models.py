from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class Client(AbstractUser):

    email = models.EmailField(_("email address"), unique=True, blank=False, null=False)
