from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth


# Create your views here.


def login(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect('yuzu_gallery:index')
        return render(request, 'user_login/login.html')
    elif request.method == 'POST':
        user = auth.authenticate(request, username=request.POST.get('username'), password=request.POST.get('password'))
        if user is not None and user.is_active:
            auth.login(request, user)
            return redirect('yuzu_gallery:index')
        else:
            return redirect('user_login:login')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth.login(request, user)
            return redirect('yuzu_gallery:index')
    else:
        return render(request, 'user_login/register.html')


def logout(request):
    if request.user.is_authenticated:
        auth.logout(request)
        return redirect('yuzu_gallery:index')
    else:
        return redirect('yuzu_gallery:index')
