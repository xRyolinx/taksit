from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import JsonResponse
from django.core.serializers import serialize
from base64 import b64encode

from django.core.mail import send_mail
from django.conf import settings

from datetime import datetime
from zoneinfo import ZoneInfo
import sys

from .models import *

import json
import os
    


# send error
def send_error(msg):
    return JsonResponse({
        "status" : "NO",
        "error" : msg,
    })


# get image
def get_images(request):
    id = request.GET.get('id', None)
    
    # get img by id
    if id:
        image = Image.objects.filter(pk=id).values('id', 'name', 'image')
        if not image: 
            return send_error("L'id de cette image n'existe pas!")
        image = list(image)
        image = image[0]
        # decode
        img = b64encode(image['image']).decode("utf-8")
        # add for src img
        image['image'] = 'data:;base64,' + img
        
        
        # end
        return JsonResponse({
            "status" : "OK",
            "image" : image,
        })
        
    # get all images
    else:
        images = Image.objects.all().values('id', 'name', 'image')
        images = list(images)
        for i in range(len(images)):
            # decode
            img = b64encode(images[i]['image']).decode("utf-8")
            # add for src img
            images[i]['image'] = 'data:;base64,' + img
        # end
        return JsonResponse({
            "status" : "OK",
            "images" : images,
        })

# add image
def add_image(request):
    # check method
    if request.method != 'POST':
        return send_error('Please send via a post request !')
    
    # get img
    name = request.POST.get('name', None)
    img = request.FILES.get('image', None)
    
    try:
        img = img.read()
        # img = b64encode(img).decode("utf-8")
    except:
        send_error('An error occured !')
    
    # check data
    if (not img):
        send_error("You didn't send an image!")
        
    # add to db
    added = Image(image=img)
    added.save()
    
    # name
    if not name:
        name = f'image {added.pk}'
    added.name = name
    added.save()
        
    # end
    return JsonResponse({
        "status" : "OK",
        "id" : added.pk,
    })

# delete image
def delete_images(request):
    # check method
    if request.method != 'POST':
        return send_error('Please send via a post request !')
    
    # get img
    id = request.POST.get('id', None)
    try:
        img = Image.objects.get(pk=id)
    except:
        return send_error("L'id de cette image n'existe pas !")

    # delete
    try:
        img.delete()
    except:
        return send_error("Cette image est utilisée !")
    
    # end
    return JsonResponse({
        "status" : "OK",
    })


# Categories
def categories_view(request):
    # quantity
    quantity = request.GET.get('quantity', None)
    
    # with sous categories
    check_sous_categorie = request.GET.get('sc', '')
    
    # get all objects
    if not quantity:
        categories = Categorie.objects.all().order_by('order_on_home').values('id', 'nom', 'image')
    else:
        categories = Categorie.objects.all().order_by('order_on_home').values('id', 'nom', 'image')[:quantity]
        
    # to json
    categories = list(categories)
    
    # img
    for i in range(len(categories)):
        # fetch img
        try:
            img_model = Image.objects.get(pk=categories[i]['image'])
        except:
            return send_error("L'id de cette image n'existe pas!")
        # decode
        img = b64encode(img_model.image).decode("utf-8")
        # add for src img
        categories[i]['image'] = 'data:;base64,' + img
    
    # sous_categories
    if check_sous_categorie == 'true':
        for i in range(len(categories)):
            # get objects of sous categories
            sous_categories = Sous_Categorie.objects.filter(categorie=categories[i]['id']).values('id', 'nom')
            # to json
            sous_categories = list(sous_categories)
            # add to dict
            categories[i]['sous_categories'] = sous_categories
    

    # send
    # filename = os.listdir(".")
    return JsonResponse({
        "status" : "OK",
        "categories" : categories,
        # "names" : filename,
    })


# Sous categories
def sous_categories_view(request):
    # Nom de la categorie mere
    categorie_name = request.GET.get('categorie', '')
    
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
        sous_categories = categorie.sous_categories.all().order_by('nom').values('id', 'nom')
    else:
        sous_categories = categorie.sous_categories.all().order_by('nom').values('id', 'nom')[:quantity]
    
    # to json
    sous_categories = list(sous_categories)
    
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
    categorie_name = request.GET.get('categorie', '')
    categorie = None
    
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
    elif categorie_name:
        try:
            categorie = Categorie.objects.get(nom__iexact=categorie_name)
        except:
            return JsonResponse({
                "status" : "NO",
                "error" : "Le nom de la categorie n'exite pas",
            })
    
    
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
    if filter and filter not in ['nom', 'prix_principal', 'nb_commandes']:
        return JsonResponse({
            "status" : "NO",
            "error" : "Ce filtre n'exite pas",
        })
        
    # descending order for nb_commandes
    if filter == 'nb_commande':
        filtre = '-nb_commandes'
        
    # choose categorie or sous categorie
    if sous_categorie:
        source = sous_categorie
    elif categorie:
        source = categorie
    else:
        source = None
    
    
    # get objects of sous categorie
    if source:
        if query:
            if filter:
                produits = source.produits.filter(nom__icontains=query).order_by(filter).values('id', 'nom', 'prix_principal', 'image', 'nb_commandes')[skip:skip+quantity]
            else:
                produits = source.produits.filter(nom__icontains=query).values('id', 'nom', 'prix_principal', 'image', 'nb_commandes')[skip:skip+quantity]
        else:
            if filter:
                produits = source.produits.all().order_by(filter).values('id', 'nom', 'prix_principal', 'image', 'nb_commandes')[skip:skip+quantity]
            else:
                produits = source.produits.all().values('id', 'nom', 'prix_principal', 'image', 'nb_commandes')[skip:skip+quantity]     

    # get all objects
    else:
        if query:
            if filter:
                produits = Produit.objects.filter(nom__icontains=query).order_by(filter).values('id', 'nom', 'prix_principal', 'image', 'nb_commandes')[skip:skip+quantity]
            else:
                produits = Produit.objects.filter(nom__icontains=query).values('id', 'nom', 'prix_principal', 'image', 'nb_commandes')[skip:skip+quantity]
        else:
            if filter:
                produits = Produit.objects.all().order_by(filter).values('id', 'nom', 'prix_principal', 'image', 'nb_commandes')[skip:skip+quantity]
            else:
                produits = Produit.objects.all().values('id', 'nom', 'prix_principal', 'image', 'nb_commandes')[skip:skip+quantity]

    # to json
    produits = list(produits)
    
    # images
    for i in range(len(produits)):
        # fetch img
        try:
            img_model = Image.objects.get(pk=produits[i]['image'])
        except:
            return send_error("L'id de cette image n'existe pas!")
        # decode
        img = b64encode(img_model.image).decode("utf-8")
        # add for src img
        produits[i]['image'] = 'data:;base64,' + img
    
    # total
    total_check = request.GET.get('total', None)
    if total_check == 'true':
        # count of objects of categorie / sous categorie
        if source:
            if query:
                total = source.produits.filter(nom__icontains=query).count()
            else:
                total = source.produits.all().count()     

        # count of all objects
        else:
            if query:
                total = Produit.objects.filter(nom__icontains=query).count()
            else:
                total = Produit.objects.all().count()

        # send
        return JsonResponse({
            "status" : "OK",
            "produits" : produits,
            "total" : total,
        })

    # send without total
    return JsonResponse({
        "status" : "OK",
        "produits" : produits,
    })


# Produit
def produit_view(request):
    # Id du produit
    try:
        id = int(request.GET.get('id', 0))
    except:
        return JsonResponse({
            "status" : "NO",
            "error" : "L'id doit etre un nombre!",
        })

    # Le produit
    produits = Produit.objects.filter(pk=id)
    if not produits:
        return send_error("L'id de ce produit n'exite pas")
    produit = produits[0]

    
    # prix
    prix = list(produit.mensualites.all().order_by('order').values('id', 'prix', 'remboursement_mois'))
    
    # details
    details = list(produit.details.all().order_by('order').values('nom_detail', 'information'))
    
    # description
    description = list(produit.description.all().order_by('order').values('paragraphe'))
    
    
    # to json
    produit = serialize('json', produits)
    produit = json.loads(produit)
    produit = produit[0]
    produit['fields']['id'] = produit['pk']
    produit = produit['fields']
    
    # add other fields
    produit['mensualites'] = prix
    produit['details'] = details
    produit['description'] = description
    
     # fetch img
    try:
        img_model = Image.objects.get(pk=produit['image'])
    except:
        return send_error("L'id de cette image n'existe pas!")
    # decode
    img = b64encode(img_model.image).decode("utf-8")
    # add for src img
    produit['image'] = 'data:;base64,' + img
    
    
    # send
    return JsonResponse({
        "status" : "OK",
        "produit" : produit,
    })


# Commande
def commande_view(request):
    # get to page
    # if request.method != 'POST':
    #     return JsonResponse({
    #         "status" : "NO",
    #         "error" : "Please send via a POST request!"
    #     })
    if request.method == 'GET':
        return render(request, 'api/commande.html')
    
    # submit form
    if request.method == 'POST':
        # get data
        data = json.loads(request.body)
        
        nom = data.get('nom')
        telephone = data.get('telephone')
        wilaya = data.get('wilaya')
        commune = data.get('commune')
        adresse_complete = data.get('adresse_complete')
        mode_livraison = data.get('mode_livraison')
        salaire = data.get('salaire')
        produits = data.get('produits')
        
        print(nom, telephone, wilaya, commune, adresse_complete, mode_livraison, salaire)
        
        # check if all here
        if (not nom or not telephone or not salaire or not wilaya or not commune
        or not adresse_complete or not mode_livraison):
            return send_error("Veuillez bien saisir toutes les informations!")
        
        if not produits:
            return send_error("Vous n'avez commandé aucun produit!")
        
        # salaire type checking
        try:
            salaire = int(salaire)
        except:
            return send_error("Le salaire doit etre de type int !")
        
        #  produits check
        for produit in produits:
            if not all(k in produit for k in ("produit_id", "mensualite_id", "quantite")):
                return send_error("Keys missing!")
        
        # date - heure
        date_heure_envoi = datetime.now().strftime("%d/%m/%Y - %H:%M:%S")
        # date_heure_envoi = datetime.now(tz=ZoneInfo("Africa/Algiers")).strftime("%d/%m/%Y - %H:%M:%S")


        # get products
        products = []
        for el in produits:
            # convert to int
            try:
                id_produit = int(el['produit_id'])
                quantite = int(el['quantite'])
                id_mensualite = int(el['mensualite_id'])
            except:
                return send_error("Les id et la quantite doivent etre de type int!")
            
            # get product
            try:
                produit = Produit.objects.get(pk=id_produit)
            except:
                return send_error("L'id de ce produit n'existe pas!")
            
            # get mensualite
            try:
                mensualite = produit.mensualites.get(pk=id_mensualite)
            except:
                return send_error("L'id de cette mensualite n'existe pas!")
            
            # ajouter
            products.append({
                'produit' : produit.nom_complet,
                'quantite' : quantite,
                'prix' : mensualite.prix,
                'duree' : mensualite.remboursement_mois,
            })            
        
        
        # add commande to db
        added = Commande(nom=nom, telephone=telephone, salaire=int(salaire), wilaya=wilaya, commune=commune, adresse_complete=adresse_complete, mode_de_livraison=mode_livraison, date_heure_envoi=date_heure_envoi)
        added.save()
        
        # add produits commande to db
        for el in products:
            produit_cmd = Produit_Commande(produit=el['produit'], quantite=el['quantite'], prix_mois=el['prix'],
                                           duree_mois=el['duree'], commande=added)
            produit_cmd.save()
        
        
        # envoyer mail
        message = f'''
                Nom : {nom}
                Telephone : {telephone}
                Wilaya : {wilaya}
                Commnue : {commune}
                Adresse : {adresse_complete}
                Mode de livraison : {mode_livraison}\n\n
                Produits commandés :
            '''
        
        # 
        for prod in products:
            message += f'''
                Produit : {prod['produit']}
                Quantite : {prod['quantite']}
                Prix : {prod['prix']} da/mois
                Duree de paiement : {prod['duree']} mois
            '''
            
        # send mail
        send_mail(
            'Nouvelle Commande',
            message,
            settings.EMAIL_HOST_USER,
            ['commercial@darifacileplus.dz', 'mm_rabia@esi.dz'],
            False,
        )
        
        # end
        return JsonResponse({
            "status" : "OK",
        })
