from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class GalleryUser(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)


class Image(models.Model):
    image = models.ImageField(upload_to='images_upload')
    upload_time = models.DateTimeField()
    uploader = models.ForeignKey(to=GalleryUser, on_delete=models.SET_NULL, null=True)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    images = models.ManyToManyField(to=Image)
