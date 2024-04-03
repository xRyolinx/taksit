from django.shortcuts import render, redirect, HttpResponse

def index(request):
    return render(request, "index.html")

def go_admin(request):
    return redirect('admin/')
