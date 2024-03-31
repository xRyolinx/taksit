from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('categories', views.categories_view, name='categories'),
    path('sous_categories', views.sous_categories_view, name='sous_categories'),
    path('produits', views.produits_view, name='produits'),
    path('produit', views.produit_view, name='produit'),
    path('commande', views.commande_view, name='commande'),
]