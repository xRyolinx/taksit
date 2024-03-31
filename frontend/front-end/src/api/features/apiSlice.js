// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
        })
    })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductQuery, useGetPokemonByNameQuery, useGetCategoriesQuery, useGetProductsQuery, useGetSousCategoriesQuery } = pokemonApi