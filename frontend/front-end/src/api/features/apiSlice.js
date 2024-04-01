// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories`
        }
        ),
        getSousCategories: builder.query({
            query: ({ categorie, quantity }) => `sous_categories?categorie=${categorie}`,
        }),
        getProducts: builder.query({

            query: ({ categorie, sous_categorie, quantity, skip, q, f }) => `produits?sous_categorie=${sous_categorie}&categorie=${categorie}`
        }),
        getProduct: builder.query({
            query: ({ id, nom }) => `produit?id=${id}&nom=${nom}`
        }),
        commander: builder.mutation({
            query: (body) => {
                return ({
                    url: '/commande',
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            nom: "amine darmouni",
                            telephone: "0779933302",
                            wilaya: "alger",
                            commune: "alger",
                            adresse_complete: "alger",
                            mode_livraison: "liv",
                            salaire: 10,
                            produits: [
                                {
                                    'produit_id': 1,
                                    'mensualite_id': 1,
                                    'quantite': 1,
                                }
                            ],
                        }
                    )
                })
            },
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCommanderMutation, useGetProductQuery, useGetPokemonByNameQuery, useGetCategoriesQuery, useGetProductsQuery, useGetSousCategoriesQuery } = pokemonApi