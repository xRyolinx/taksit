import React from 'react'
import stars from "@/public/Icons/stars.svg"
import productImage from "@/public/product1.svg"
const CardProduct = ({ produit }) => {
    return (
        <div className='pb-5 bg-white shadow-card flex flex-col items-center gap-2 mx-auto pt-10  px-7  text-center rounded-md  '>
            <img className='h-[200px] mx-auto' src={productImage} />
            <div className='p-2'>
                <p className='border-b-[0.8px] max-w-max font-medium text-lg border-neutral-800   mx-auto '>{produit.nom_complet}</p>
                <p className='text-[#1E1E1E]  text-md font-medium opacity-[50%]'>{produit.prix_principal} / mois</p>
            </div>
            {/* <img src={stars} /> */}
            <button className=' text-white px-2 py-1   bg-Primary-500 rounded-xl'>Plus d'infos</button>
        </div>
    )
}

export default CardProduct
