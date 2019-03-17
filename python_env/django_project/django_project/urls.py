"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.http import HttpResponse

def hello_world(request):
    html = "<html><body>Hello World</body></html>"
    return HttpResponse(html)


def check_password(request):
	if request.POST.get('username','') == 'Jimmy' and request.POST.get('password','') == 'Hendrix':
		return HttpResponse('Cool')
	else:
		return HttpResponse('Bad User Name')

urlpatterns = [
    path('e/wangx308/' , hello_world) ,
	path('e/wangx308/lab7/' , check_password)
]

