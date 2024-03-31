from django.db import models

# Categories
class Categorie(models.Model):
    nom = models.CharField(max_length=64)
    image = models.CharField(max_length=64)    
    order_on_home = models.IntegerField(unique=True)
    
    def __str__(self):
        return f"{self.nom}"


# Sous-categories
class Sous_Categorie(models.Model):
    nom = models.CharField(max_length=64)
    image = models.CharField(max_length=64)   
    categorie = models.ForeignKey(Categorie, on_delete = models.CASCADE, related_name="sous_categories") 
    
    def __str__(self):
        return f"{self.nom}"



# Produits
class Produit(models.Model):
    nom = models.CharField(max_length=64)
    nom_complet = models.CharField(max_length=64)
    prix_principal = models.IntegerField(default=0)
    image = models.CharField(max_length=64)
    categorie = models.ForeignKey(Categorie, on_delete = models.CASCADE, related_name="produits")
    sous_categorie = models.ForeignKey(Sous_Categorie, on_delete = models.CASCADE, related_name="produits")
    nb_commandes = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.nom_complet}"


# Mensualites de produit
class Mensualite(models.Model):
    prix = models.IntegerField(default=0)
    remboursement_mois = models.IntegerField(default=0)
    order = models.IntegerField()
    produit = models.ForeignKey(Produit, on_delete = models.CASCADE, related_name="mensualites")
    
    def __str__(self):
        return f"{self.prix}"


# Details de produit
class Detail(models.Model):
    nom_detail = models.CharField(max_length=64)
    information = models.CharField(max_length=64)
    order = models.IntegerField()
    produit = models.ForeignKey(Produit, on_delete = models.CASCADE, related_name="details")


# Description de produit
class Description_Paragraphe(models.Model):
    paragraphe = models.TextField()
    order = models.IntegerField()
    produit = models.ForeignKey(Produit, on_delete = models.CASCADE, related_name="description")



# Commandes
class Commande(models.Model):
    nom = models.CharField(max_length=64)
    telephone = models.CharField(max_length=64)
    salaire = models.IntegerField()
    
    wilaya = models.CharField(max_length=64)
    commune = models.CharField(max_length=64)
    adresse_complete = models.TextField()
    
    mode_de_livraison = models.CharField(max_length=64)
    
    date_heure_envoi = models.CharField(max_length=64)


# Produits de la commande
class Produit_Commande(models.Model):
    produit = models.CharField(max_length=64)
    quantite = models.IntegerField()
    prix_mois = models.CharField(max_length=64)
    duree_mois = models.CharField(max_length=64)
    commande = models.ForeignKey(Commande, on_delete = models.CASCADE, related_name="produits")


# About
class About(models.Model):    
    numero = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    
    lien_insta = models.CharField(max_length=64)
    lien_facebook = models.CharField(max_length=64)