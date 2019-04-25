from django.urls import path
from . import views

app_name = 'yuzu_gallery'

urlpatterns = [
    path('', views.index, name='index'),
    path('image/', views.open_pic, name='image'),
    path('user', views.user, name='user'),
    path('upload', views.upload, name='upload'),
    path('tag_all', views.tag_all, name='tag_all')
]
