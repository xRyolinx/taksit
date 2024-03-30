from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import JsonResponse
from django.core.serializers import serialize

from django.core.mail import send_mail
from django.conf import settings

from datetime import datetime
from zoneinfo import ZoneInfo

from .models import *

import json



def to_json(element):
    element = serialize("json", element)
    element = json.loads(element)
    for i in range(len(element)):
        element[i] = element[i]['fields']
    return element
    


# Categories
def categories_view(request):
    # get all objects
    categories = Categorie.objects.all().order_by('order_on_home')
    
    # to json
    categories = to_json(categories)
    
    # send
    return JsonResponse({
        "status" : "OK",
        "categories" : categories,
    })


# Sous categories
def sous_categories_view(request):
    # Nom de la categorie mere
    categorie_name = request.GET.get('categorie', '')
    print(categorie_name)
    
    # La categorie mere
    try:
        categorie = Categorie.objects.get(nom__iexact=categorie_name)        
    except:
        return JsonResponse({
        "status" : "NO",
        "error" : "Le nom de la categorie n'exite pas",
    })
    
    # get all objects
    sous_categories = categorie.sous_categories.all().order_by('nom')
    
    # to json
    sous_categories = to_json(sous_categories)
    
    # send
    return JsonResponse({
        "status" : "OK",
        "sous_categories" : sous_categories,
    })


# Produits
def produits_view(request):
    # Sous categorie
    sous_categorie_name = request.GET.get('sous_categorie', '')
    
    # La sous_categorie
    sous_categorie = None
    if sous_categorie_name:
        try:
            sous_categorie = Sous_Categorie.objects.get(nom__iexact=sous_categorie_name)
        except:
            return JsonResponse({
            "status" : "NO",
            "error" : "Le nom de la sous_categorie n'exite pas",
        })
    
    # start
    start = request.GET.get('start', 0)
    
    # quantity
    quantity = request.GET.get('quantity', 20)
    
    # get all objects
    if sous_categorie:
        produits = sous_categorie.produits.all()[start:start+quantity]
    else:
        produits = Produit.objects.all()[start:start+quantity]
        
    # to json
    produits = to_json(produits)

    # send
    return JsonResponse({
        "status" : "OK",
        "produits" : produits,
    })
    


# Commande
def commande(request):
    # get to page
    if request.method != 'POST':
        return JsonResponse({
            "status" : "NO",
            "error" : "Please send via a POST request!"
        })
    
    # submit form
    if request.method == 'POST':
        # get data
        nom = request.POST.get('nom')
        telephone = request.POST.get('telephone')
        salaire = request.POST.get('salaire')
        wilaya = request.POST.get('wilaya')
        commune = request.POST.get('commune')
        adresse_complete = request.POST.get('adresse_complete')
        mode_livraison = request.POST.get('mode_livraison')
        
        if not nom or not telephone or not salaire or not wilaya or not commune or not adresse_complete or not mode_livraison:
            return JsonResponse({
                "status" : "NO",
                "error" : "Veuillez bien saisir toutes les informations!"
            })
        
        date_heure_envoi = datetime.now(tz=ZoneInfo("Africa/Algiers")).strftime("%d/%m/%Y - %H:%M:%S")
        
        # add to db
        added = Commande(nom=nom, email=email, sujet=sujet, message=message, date_heure_envoi=date_heure_envoi)
        added.save()
        
        send_mail(
            sujet,
            f'From: {nom}\nEmail: {email}\n\n{message}',
            'settings.EMAIL_HOST_USER',
            ['mm_rabia@esi.dz', 'maissaafrit9@gmail.com'],
            False,
        )
        
        # end
        return JsonResponse({
            "status" : "OK",
        })
