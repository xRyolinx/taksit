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


# serialize querySet to json
def to_json(element):
    element = serialize("json", element)
    element = json.loads(element)
    for i in range(len(element)):
        element[i] = element[i]['fields']
    return element
    


# Categories
def categories_view(request):
    # quantity
    quantity = request.GET.get('quantity', None)
    
    # get all objects
    if not quantity:
        categories = Categorie.objects.all().order_by('order_on_home')
    else:
        categories = Categorie.objects.all().order_by('order_on_home')[:quantity]
    
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

    # quantity
    quantity = request.GET.get('quantity', None)
    
    # get all objects
    if not quantity:
        sous_categories = categorie.sous_categories.all().order_by('nom')
    else:
        sous_categories = categorie.sous_categories.all().order_by('nom')[:quantity]
    
    # to json
    sous_categories = to_json(sous_categories)
    
    # send
    return JsonResponse({
        "status" : "OK",
        "sous_categories" : sous_categories,
    })


# Produits
def produits_view(request):
    # Categorie ou Sous categorie
    sous_categorie_name = request.GET.get('sous_categorie', '')
    sous_categorie = None
    # categorie_name = request.GET.get('categorie', '')
    # categorie = None
    
    # La sous_categorie
    if sous_categorie_name:
        try:
            sous_categorie = Sous_Categorie.objects.get(nom__iexact=sous_categorie_name)
        except:
            return JsonResponse({
                "status" : "NO",
                "error" : "Le nom de la sous_categorie n'exite pas",
            })

    # La categorie
    # elif categorie_name:
    #     try:
    #         categorie = Categorie.objects.get(nom__iexact=categorie_name)
    #     except:
    #         return JsonResponse({
    #             "status" : "NO",
    #             "error" : "Le nom de la categorie n'exite pas",
    #         })
    
    
    # skip and quantity
    try:
        skip = int(request.GET.get('skip', 0))
        quantity = int(request.GET.get('quantity', 20))
    except:
        return JsonResponse({
            "status" : "NO",
            "error" : "Les parametres 'skip' et 'quantity' doivent etre des nombres!",
        })
        
    
    # ---- query and filter ----
    # query
    query = request.GET.get('q', None)
    
    # filter
    filter = request.GET.get('f', None)
    if filter and filter not in ['nom', 'prix_principal']:
        return JsonResponse({
            "status" : "NO",
            "error" : "Ce filtre n'exite pas",
        })
    
    
    # get objects of sous categorie
    if sous_categorie:
        if query:
            if filter:
                produits = sous_categorie.produits.filter(nom__icontains=query).order_by(filter)[skip:skip+quantity]
            else:
                produits = sous_categorie.produits.filter(nom__icontains=query)[skip:skip+quantity]
        else:
            if filter:
                produits = sous_categorie.produits.all().order_by(filter)[skip:skip+quantity]
            else:
                produits = sous_categorie.produits.all()[skip:skip+quantity]     

    # get all objects
    else:
        if query:
            if filter:
                produits = Produit.objects.filter(nom__icontains=query).order_by(filter)[skip:skip+quantity]
            else:
                produits = Produit.objects.filter(nom__icontains=query)[skip:skip+quantity]
        else:
            if filter:
                produits = Produit.objects.order_by(filter)[skip:skip+quantity]
            else:
                produits = Produit.objects.all()[skip:skip+quantity]  
        
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
        
        produits = request.POST.get('produits')
        
        if (not nom or not telephone or not salaire or not wilaya or not commune
        or not adresse_complete or not mode_livraison or not produits):
            return JsonResponse({
                "status" : "NO",
                "error" : "Veuillez bien saisir toutes les informations!"
            })
        
        date_heure_envoi = datetime.now(tz=ZoneInfo("Africa/Algiers")).strftime("%d/%m/%Y - %H:%M:%S")


        # get products
        products = []
        for el in produits:
            try:
                produit = Produit.objects.get(pk=int(el['id']))
                products.append({
                        'produit' : produit,
                        'quantite' : el['quantite'],
                        'prix' : el['prix'],
                    })
            except:
                return JsonResponse({
                    "status" : "NO",
                    "error" : "L'id de ce produit n'existe pas!"
                })
            
            
        # add commande to db
        added = Commande(nom=nom, telephone=telephone, salaire=int(salaire), wilaya=wilaya, commune=commune, adresse_complete=adresse_complete, mode_livraison=mode_livraison, date_heure_envoi=date_heure_envoi)
        added.save()
        
        # add produits commande to db
        for el in products:
            produit_cmd = Produit_Commande(quantite=el['quantite'], prix=el['prix'], commande=added)
            produit_cmd.save()
        
        
        # envoyer mail
        message = f'''
                From: {nom}\n
                Telephone: {telephone}\n
                Wilaya: {wilaya}\n
                Commnue: {commune}\n
                Adresse: {adresse_complete}\n
                Mode de livraison: {mode_livraison}\n\n\n
                Produits commandés:\n\n
            '''
        
        for prod in products:
            message += f'''
                {prod['produit'].nom}\n
                Quantite: {prod['quantite']}\n
                Prix: {prod['prix']}\n\n
            '''
            
            
        send_mail(
            'Nouvelle Commande',
            message,
            'settings.EMAIL_HOST_USER',
            ['mm_rabia@esi.dz'],
            False,
        )
        
        # end
        return JsonResponse({
            "status" : "OK",
        })
