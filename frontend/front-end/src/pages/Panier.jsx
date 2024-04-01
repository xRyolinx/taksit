import React, { useEffect, useState } from 'react'
import product from "@/public/product1.svg"
const PanierElement = ({ setTotalFacilite }) => {
    let prix = 1200;
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(prix);
    useEffect(() => {
        setTotal(prix * quantity);
    }, [quantity])

    useEffect(() => {
        if (quantity === 1) {
            setTotalFacilite((prev) => prev + total)
        }
    }, [])

    useEffect(() => {
        
    }, [])
    return (
        <li className='py-5  border-neutral-400 border-t-[1px] border-b-[1px] flex items-center font-Poppins justify-between'>
            <div className='flex  items-center gap-5'>
                <img src={product} className='w-20' />
                <div className='space-y-4'>
                    <h1 className='text-lg font-[500]'>Cuisinière Brandt</h1>
                    <h3 className='text-neutral-700 font-[300] text-sm'>1200da/Mois</h3>
                    <button className='px-3 py-2 rounded-xl bg-Primary-100 text-black '>Voir Plus</button>
                </div>
            </div>
            <h4 className='font-[500] text-md  text-black'>GFEDcba123</h4>
            <div className='flex flex-row items-center gap-4 font-[500] text-lg text-black'>
                <button
                    onClick={() => {
                        setQuantity((prev) => prev + 1)
                        setTotalFacilite((prev) => prev + prix)
                    }}
                >+</button>
                <p className=''>{quantity}</p>
                <button onClick={() => {
                    setQuantity((prev) => {
                        if (prev > 1) {
                            return prev - 1
                        } else {
                            return 1
                        }

                    })
                    setTotalFacilite((prev) => quantity > 1 ? prev - prix : prev)
                }
                }
                >-</button>
            </div>
            <h4 className='text-lg font-[500] text-black'>{total}/mois</h4>
        </li>
    )

}


const Panier = () => {

    const panier = [
        {
            id: 1,
            nom: "Cuisinière Brandt",
            prix: 1200,
            Reference: "GFEDcba123",
            image: ""
        }, {
            id: 2,
            nom: "Cuisinière Brandt",
            prix: 1200,
            Reference: "GFEDcba123",
            image: ""
        }, {
            id: 3,
            nom: "Cuisinière Brandt",
            prix: 1200,
            Reference: "GFEDcba123",
            image: ""
        }]
    const [quantity, setQuantity] = useState(panier.length);
    const [total, setTotalFacilite] = useState(0);

    return (
        <section className='mt-[200px] font-Poppins mb-[200px] w-[80%] mx-auto'>
            <h1 className='max-w-max mx-auto text-2xl text-neutral-800 font-[700] font-AnyBody'>Votre <span className='text-Secondary-700'>Panier</span></h1>
            <div>
                <header className='flex items-center justify-between font-Poppins font-[500] text-lg text-center text-Primary-700'>
                    <h1 className='flex-1 text-center'>Produit</h1>
                    <h1 className=' flex-1 w-[200px]  text-center'>Reference</h1>
                    <h1 className='flex-1 text-center '>Quantité</h1>
                    <h1 className='flex-1 text-center'>Sous Totale</h1>
                </header>
                <PanierElement setTotalFacilite={setTotalFacilite} />
                <PanierElement setTotalFacilite={setTotalFacilite} />
                <PanierElement setTotalFacilite={setTotalFacilite} />

            </div>
            <div className='flex justify-between my-4'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-Primary-900 text-md font-[400] '>Durée Maximale : </h1>
                    <h3 className='text-Primary-700 text-md font-[500]'>50 Mois</h3>
                </div>
                <div className='flex items-center gap-3'>
                    <h1 className='text-Primary-900 text-md font-[400]'>Facilité</h1>
                    <h3 className='text-secondary-900 text-md  font-[500]'>{total}/Mois</h3>
                </div>
            </div>
            <button className='text-Secondary-900 font-[500] bg-Secondary-300 px-2 py-2 rounded-md'>Confirmer Votre Achat</button>
        </section>
    )
}

export default Panier
