import React from 'react'
import { useGetProductsQuery, useGetSousCategoriesQuery } from '../api/features/apiSlice'
import CardProduct from './CardProduct'

const CardsProducts = ({ sous_categorie }) => {
    const { data, isLoading } = useGetProductsQuery({ sous_categorie: sous_categorie, quantity: 10, skip: 0, q: null, f: null })
    // const { data } = useGetSousCategoriesQuery({ categorie: "Electromenager", quantity: 10 })

    console.log("data", data);
    return (
        isLoading ? <h1>isLoading</h1> :
            <div className='flex  flex-row   flex-wrap  gap-10  '>
                {
                    data.produits.map((produit) => {
                        return (<CardProduct produit={produit} />)
                    })
                }
            </div>
    )
}

export default CardsProducts
