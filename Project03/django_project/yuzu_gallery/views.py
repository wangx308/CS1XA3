from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.

def index(request):
    return render(request, 'yuzu_gallery/index.html')

def open_pic(request):
    return render(request, 'yuzu_gallery/open_pic.html')

def user(request):
    return render(request, 'yuzu_gallery/user.html')

def upload(request):
    return render(request,'yuzu_gallery/upload.html')

def tag_all(request):
    return render(request,'yuzu_gallery/tag_all.html')