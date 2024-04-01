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
