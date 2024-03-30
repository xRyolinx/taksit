Full stack e-commerce app

API Documentation
We will see in the following the routes possible.

IMPORTANT:
Some get-parameters are **essentials** for the working of the api.
They will have the notation (M) next to them (Must).


Routes:
- Route 1 : /api/categories
    Parameters:
    - 'quantity' : max_size of the array returned. (must be int)

- Route 2 : /api/sous_categories
    Parameters:
    - 'categorie' (M) : to know from which categorie return. (must be the 'nom' of the categorie)
    - 'quantity' : max_size of the array returned. (must be int)

- Route 3 : /api/produits
    Parameters:
    - 'sous_categorie' (M) : to know from which sous_categorie return (must be the 'nom' of the sous_categorie)
    - 'skip' : how much to skip [ex: skip=2 means it will skip 2 item] (must be int)
    - 'quantity' : max_size of the array returned (must be int)
    - 'q' : query (recherche)
    - 'f' : filter
        - f=nom : filtrer par nom (Ordre alphabetique)
        - f=prix_principal : filtrer par prix (par ordre croissant, **du** plus **bas au** plus **haut** prix)

- Route 4 : /api/commandes
(finished, but need more testing)

- Route 5 : /api/produit/<nom_produit>
(not yet, but it's easy)