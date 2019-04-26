import datetime

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django import forms


class GalleryUser(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='gallery_user',
                                related_query_name='gallery_user')


class Image(models.Model):
    image = models.ImageField(upload_to='images')
    upload_time = models.DateTimeField(default=datetime.datetime.now())
    uploader = models.ForeignKey(to=GalleryUser, on_delete=models.SET_NULL, null=True, related_name='uploaded_images',
                                 related_query_name='uploaded_image')
    liked_users = models.ManyToManyField(to=GalleryUser, related_name='liked_images', related_query_name='liked_image',
                                         blank=True)


class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image','uploader']


class Tag(models.Model):
    name = models.CharField(max_length=100)
    images = models.ManyToManyField(to=Image, related_name='tags', related_query_name='tag')
