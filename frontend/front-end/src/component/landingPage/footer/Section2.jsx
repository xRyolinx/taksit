import React from 'react'
import LivraisonIcon from "@/public/Icons/livraisonIcon.svg"
import ServiceIcon from "@/public/Icons/serviceIcon.svg"
import GarentieIcon from "@/public/Icons/garentieIcon.svg"

const Feature = ({ src, name, numbers }) => {
    return (
        <div className='flex flex-col text-center   text-Secondary-900'>
            <img className='' src={src} />

            <h2 className=' mt-6 font-semibold text-lg '>
                {name}
            </h2>
            <h3 className='font-normal text-sm'>
                {numbers}
            </h3>
        </div>
    )
}

const Section2 = () => {

    const featuresArray = [
        {
            id: 1,
            name: "Service Client",
            numbers: "24h / 7j",
            src: ServiceIcon

        },
        {
            id: 2,
            name: "Garantie",
            numbers: "12 mois",
            src: GarentieIcon
        },
        {
            id: 3,
            name: "Livraison rapide ",
            numbers: "58  wilaya",
            src: LivraisonIcon
        }
    ]
    return (
        <section>
            <section className='flex items-center p-10 max-w-[800px] justify-between mx-auto '>
                {
                    featuresArray.map(({ id, name, numbers, src }) => {
                        return <Feature key={id} name={name} numbers={numbers} src={src} />
                    })
                }
            </section>
        </section>
    )
}

export default Section2
