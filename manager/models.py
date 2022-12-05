from django.db import models
from django.contrib.auth.models import AbstractUser, User
from manager.user_manager import UserManager
# Create your models here.

class User(AbstractUser):
  username = None
  first_name = None
  last_name = None
  email = models.EmailField(unique=True)
  name = models.CharField(max_length=64)
  USERNAME_FIELD = "email"
  objects = UserManager()
  REQUIRED_FIELDS = ['name']

class Password_Table(models.Model):
  name = models.CharField(max_length=200, blank=False, null=False)
  password = models.CharField(max_length=100, blank=False, null=False)
  link = models.ForeignKey(User , on_delete=models.CASCADE)
  
  def __str__(self):
    return self.link.name