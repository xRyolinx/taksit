import React from 'react'
import Img from "react-optimized-image"
import image from "@/public/vite.svg"
import product from "@/public/product1.svg"
import CardProduct from '../component/CardProduct'
import { useGetCategoriesQuery, useGetProductsQuery, useGetSousCategoriesQuery } from '../api/features/apiSlice'
import { useLocation, useParams } from 'react-router'
import CardsProducts from '../component/CardsProducts'
import { Link } from 'react-router-dom'

const ProductsWithCategory = ({ data, categorie, sous_categorie }) => {

    return (
        <section className='py-8  flex flex-col gap-6 items-start'>
            <h1 className='font-AnyBody text-2xl text-Secondary-900 font-[800]'>
                {data.nom}
            </h1>
            <CardsProducts categorie={categorie} sous_categorie={sous_categorie} />
            <Link className='max-w-max mx-auto' to={`?sous_categorie=${data.nom}`} >
                <button className='font-[500] mx-auto text-lg py-1 px-3 rounded-xl bg-Secondary-300 text-Secondary-900'>
                    Voir tout
                </button>
            </Link>
        </section>
    )
}


const AllProducts = () => {
    // const { data: categories, isLoading, error } = useGetCategoriesQuery({ quantity: 20 });
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(searchParams.entries());
    const { categorie, sous_categorie, q, f } = paramsObject;
    console.log("category", categorie);
    if (!q && !f) {
        if (sous_categorie) {
            return (
                <main className='space-y-10'>
                    <h1 className='max-w-max font-AnyBody mt-[150px] mx-auto font-[700] text-3xl text-neutral-800'>Explorez Nos <span className='text-Secondary-700'>{sous_categorie}</span>!</h1>
                    <CardsProducts sous_categorie={sous_categorie} />
                </main>
            )
        }
        else if (categorie) {
            const { data: sous_categories, isLoading, error } = useGetSousCategoriesQuery({ categorie: categorie, quantity: 20 })
            return (
                <div className='w-full'>
                    <h1 className='max-w-max font-AnyBody mt-[150px] mx-auto font-[700] text-3xl text-neutral-800'>Explorez Nos <span className='text-Secondary-700'>{categorie}</span>!</h1>
                    <main className='w-[80%]   mx-auto '>
                        {
                            !error && isLoading ? <h1>is Loading</h1> :
                                sous_categories.sous_categories?.map(sous_categorie => {
                                    return (
                                        <ProductsWithCategory sous_categorie={sous_categorie.nom} categorie={null} data={sous_categorie} />
                                    )
                                }
                                )
                        }
                    </main>
                </div>
            )
        }
        else {
            const { data: categories, isLoading, error } = useGetCategoriesQuery()
            console.log("categories", categories);
            return (
                <div className='w-full' >
                    <h1 className='max-w-max font-AnyBody mt-[150px] mx-auto font-[700] text-3xl text-neutral-800'>Explorez Nos <span className='text-Secondary-700'>{categorie}</span>!</h1>
                    <main className='w-[80%]   mx-auto '>
                        {
                            !error && isLoading ? <h1>is Loading</h1> :
                                categories.categories?.map(categorie => {
                                    return (
                                        <ProductsWithCategory sous_categorie={null} categorie={categorie.nom} data={categorie} />
                                    )
                                }
                                )
                        }
                    </main>
                </div>
            )

        }

    }

    // const {categorie} = useParams();
    // console.log("sous_categories", sous_categories);

    const array = [product, product, product, product, product, product,]
}

export default AllProducts

