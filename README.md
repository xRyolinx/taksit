Full stack e-commerce app


API Documentation : We will see in the following the routes possible.


IMPORTANT:

Some get-parameters are **essentials** for the working of the api.
They will have the notation (M) next to them (Must).


Routes:
- Route 1 : /api/categories

    Parameters:
    - 'quantity' : max_size of the array returned. (must be int)
    - 'sc' : sc=true <=> send sous_categorie within the categories.

- Route 2 : /api/sous_categories

    Parameters:
    - 'categorie' (M) : to know from which categorie return. (must be the 'nom' of the categorie)
    - 'quantity' : max_size of the array returned. (must be int)

- Route 3 : /api/produits

    Parameters:
    - 'categorie' : to know from which categorie return (must be the 'nom' of the categorie)
    - 'sous_categorie' : to know from which sous_categorie return (must be the 'nom' of the sous_categorie).
    PS: The sous_categorie parameter negates the categorie parameter. (sous_categorie has more priority than the categorie)
    - 'skip' : how much to skip [ex: skip=2 means it will skip 2 item] (must be int)
    - 'quantity' : max_size of the array returned (must be int)
    - 'q' : query (recherche)
    - 'f' : filter
        - f=nom : filtrer par nom (Ordre alphabetique)
        - f=prix_principal : filtrer par prix (par ordre croissant, **du** plus **bas au** plus **haut** prix)
        - f=nb_commandes : filtrer par nb commandes (par ordre decroissant, **du** plus **haut au** plus **bas** nb commandes)

- Route 5 : /api/produit

    Parameters:
    - 'id' (M): id of the product wanted to be returned (must be int)


- Route 4 : /api/commandes
    Must be done with post request
    Parameters: All of these are required
    - nom : string
    - telephone : string
    - wilaya : string
    - commune : string
    - adresse_complete : string
    - mode_livraison : string
    - salaire : int
    - produits : **array** of objects :
        {
            'produit_id' : ,
            'mensualite_id' : ,
            'quantite' : ,
        }
        PS : All of them must be int.

