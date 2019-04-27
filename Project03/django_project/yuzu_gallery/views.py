from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import *
import random

from django import forms


# Create your views here.

def index(request):
    images = list(Image.objects.all())
    if len(images) <= 24:
        picked = images
    else:
        picked = random.sample(images, k=24)

    return render(request, 'yuzu_gallery/index.html', context={'random_images': picked})


def open_pic(request, id: int):
    image = Image.objects.get(pk=id)
    if image:
        if request.method == 'POST':
            if request.user.is_authenticated:
                g = request.user.gallery_user
                if g in image.liked_users.all():
                    image.liked_users.remove(g)
                else:
                    image.liked_users.add(g)
                return render(request, 'yuzu_gallery/open_pic.html', context={'image': image})
            else:
                return redirect('user_login:login')
        else:
            return render(request, 'yuzu_gallery/open_pic.html', context={'image': image})
    else:
        return redirect('yuzu_gallery:index')


def user(request, id: int = None):
    if not id:
        user = request.user
    else:
        user = User.objects.get(pk=id)
    if user and user.is_authenticated:
        uploaded_images = user.gallery_user.uploaded_images.all()
        liked_images = user.gallery_user.liked_images.all()
        return render(request, 'yuzu_gallery/user.html',
                      context={'uploaded_images': uploaded_images, 'liked_images': liked_images, 'profile_user':user})
    else:
        return redirect('user_login:login')


def tag_all(request):
    tags = list(Tag.objects.all())
    return render(request, 'yuzu_gallery/tag_all.html', context={'tags': tags})


def tag_detail(request, id: int):
    tag = Tag.objects.get(pk=id)
    if tag:
        images = tag.images.all()
        return render(request, 'yuzu_gallery/tag_detail.html', context={'random_images': images, 'tag': tag})
    else:
        return redirect('yuzu_gallery:index')


def upload(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            form = ImageUploadForm(request.POST, request.FILES)
            if form.is_valid():
                form.cleaned_data['uploader'] = request.user.gallery_user
                image = form.save()
                for tag_id in request.POST.getlist('tag-selection'):
                    try:
                        tag = Tag.objects.get(pk=int(tag_id))
                    except (Tag.DoesNotExist, ValueError):
                        continue
                    tag.images.add(image)
                    tag.save()
                return open_pic(request, id=image.id)
            # there is a bug: when open "open_pic", it will send a POST to the "open_pic", then it will give a auto LIKE
            else:
                form.fields['uploader'].widget.attrs.update({'hidden': 'hidden'})
                form.fields['uploader'].label = ''
                context = {'form': form}
                return render(request, template_name='yuzu_gallery/upload.html', context=context)

        else:
            tags = list(Tag.objects.all())
            form = ImageUploadForm(initial={'uploader': request.user.gallery_user.id})
            form.fields['uploader'].widget.attrs.update({'hidden': 'hidden'})
            form.fields['uploader'].label = ''
            context = {'form': form, 'tags':tags}
            return render(request, template_name='yuzu_gallery/upload.html', context=context)
    else:
        return redirect('user_login:login')


def prime(request):
    u = request.user
    if u.is_authenticated:
        try:
            u.gallery_user is None
        except GalleryUser.DoesNotExist:
            gu = GalleryUser(user=u)
            gu.save()
        return redirect('yuzu_gallery:index')
    else:
        return redirect('user_login:login')
