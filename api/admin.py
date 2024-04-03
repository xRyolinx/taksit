from django.contrib import admin
from .models import *


# Images
class ImageAdmin(admin.ModelAdmin):
    list_display = ['name']
    ordering = ['name']
    
    class Media:
        js = ('api/js/images_model_admin.js',)


# Categories
class Sous_Categorie_InlineAdmin(admin.TabularInline):
    model = Sous_Categorie
    
class CategorieAdmin(admin.ModelAdmin):
    list_display = ['nom', 'order_on_home']
    ordering = ['order_on_home']
    inlines = [Sous_Categorie_InlineAdmin]
    
    class Media:
        js = ('api/js/images_admin.js',)
        css = {
            'all' : ('api/css/images_admin.css',),
        }
        
    def get_form(self, request, obj=None, **kwargs):
        form = super(CategorieAdmin, self).get_form(request, obj, **kwargs)
        field = form.base_fields["image"]
        field.widget.can_view_related = False
        field.widget.can_add_related = False
        field.widget.can_change_related = False
        field.widget.can_delete_related = False
        return form


# Produit
class Mensualite_InlineAdmin(admin.TabularInline):
    model = Mensualite
    
class Detail_InlineAdmin(admin.TabularInline):
    model = Detail

class Description_Paragraphe_InlineAdmin(admin.TabularInline):
    model = Description_Paragraphe
    
class ProduitAdmin(admin.ModelAdmin):
    list_display = ['nom_complet']
    ordering = ['nom_complet']
    inlines = [Mensualite_InlineAdmin, Detail_InlineAdmin, Description_Paragraphe_InlineAdmin]
    readonly_fields = ['nb_commandes']
    
    class Media:
        js = ('api/js/categories_admin.js', 'api/js/images_admin.js',)
        css = {
            'all' : ('api/css/images_admin.css',),
        }
    
    def get_form(self, request, obj=None, **kwargs):
        form = super(ProduitAdmin, self).get_form(request, obj, **kwargs)
        field = form.base_fields["image"]
        field.widget.can_view_related = False
        field.widget.can_add_related = False
        field.widget.can_change_related = False
        field.widget.can_delete_related = False
        return form


# Commandes
class Produit_Commande_InlineAdmin(admin.TabularInline):
    model = Produit_Commande
    readonly_fields = ['produit', 'quantite', 'prix_mois', 'duree_mois']
    
class Commande_Admin(admin.ModelAdmin):
    list_display = ["nom", "date_heure_envoi"] 
    ordering = ['date_heure_envoi']
    inlines = [Produit_Commande_InlineAdmin]
    readonly_fields = ['nom', 'salaire', 'telephone', 'wilaya', 'commune', 'adresse_complete', 'mode_de_livraison', 'date_heure_envoi']
        
    
admin.site.register(Image, ImageAdmin)
admin.site.register(Categorie, CategorieAdmin)
admin.site.register(Produit, ProduitAdmin)
admin.site.register(Commande, Commande_Admin)