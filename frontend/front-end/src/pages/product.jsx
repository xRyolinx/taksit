import React, { useEffect, useState } from 'react'
import product from "@/public/product1.svg"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import blur from "@/public/blur.jpg"
import { useGetProductQuery } from '../api/features/apiSlice'
import Select from 'react-select';
import { Link } from 'react-router-dom'

const Case = ({ nom_detail, information }) => {
    return (
        <div className='flex gap-4'>
            <h1 className='font-[500] text-black text-xl'>{nom_detail} : </h1>
            <h1 className='font-[300] text-black '>{information}</h1>
        </div>
    )

}


const Product = () => {
    const { data: produit } = useGetProductQuery({ id: 1, nom: "" });
    console.log('PRODUIT: ', produit);
    const [options, setOption] = useState([]);
    useEffect(() => {
        produit?.produit.mensualites?.map((item) => {
            setOption((prev) => [...prev, { value: item.id, label: `${item.prix} par mois` }]);
        })
    }, [produit])
    return (
        <section className='w-[80%] space-y-4 mx-auto'>
            <section className='font-Poppins' >
                <div className='justify-between  mt-[200px] mx-auto  flex gap-10 mx-aut items-center'>

                    <LazyLoadImage
                        effect={blur}
                        src={product}
                        width={300} height={300}
                        placeholderSrc={blur}
                        alt='image product' />
                    <div className=' flex-1 p-10 space-y-4'>
                        <h1 className='font-[700] text-2xl font-AnyBody text-Secondary-900 '>MICRO ONDE ENCASTRABLE 25Lt BLANC AVEC G</h1>

                        <div>
                            {
                                produit?.produit?.details?.map(({ nom_detail, information }) => {
                                    return (<Case nom_detail={nom_detail} information={information} />)
                                })
                            }
                        </div>
                        <div className='flex w-full items-center gap-2'>
                            <h2 className='font-[500] text-black text-xl'>Mensualités :</h2>
                            <Select className='flex-1' defaultValue={options[0]} formatGroupLabel={<h1>Mensualités :</h1>} options={options} />
                        </div>
                    </div>

                </div>
                <Link to={"/panier"}> <button className='bg-Primary-500 text-white font-Poppins py-2 px-3 rounded-xl text-white'>Ajouter au panier</button></Link>
            </section>
            <section>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.

                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.

                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.

                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </section>
        </section>
    )
}

export default Product
