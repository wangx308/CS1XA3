from django.conf.urls.static import static
from django.urls import path

from . import views

app_name = 'yuzu_gallery'

urlpatterns = [
    path('', views.index, name='index'),
    path('image/<int:id>', views.open_pic, name='image'),
    path('tag/<int:id>', views.tag_detail, name='tag'),
    path('user/<int:id>', views.user, name='user'),
    path('user', views.user, name='user_self'),
    path('upload', views.upload, name='upload'),
    path('tag_all', views.tag_all, name='tag_all')
]
