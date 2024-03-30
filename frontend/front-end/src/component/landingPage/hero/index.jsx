import React from 'react'
import backgroundImage from "@/public/backgroundImage.svg"
import HeroImage from "@/public/heroImage.svg"
const Hero = () => {
    return (
        <section className='max-h-max'>
            <img className=' w-[100%] z-0' src={HeroImage} />
            <div className=' w-full h-full flex items-center justify-center relative'>
                <div className='absolute bottom-[500px] flex flex-col gap-10 text-[#1D252C]  buttom-0 text-center w-[700px] bg-[#F7F8FA] opacity-[80%]  px-20 py-10'>
                    <h1 className='text-[40px]'>Vente par facilite</h1>
                    <p className='text-[18px]'>Toute sorte de produits vendus par facilite. Choisissez parmi tant d’offres celle qui vous convient le mieux ! </p>
                    <button className='px-2 py-1 bg-brown-c-100 text-white'>Découvrez notre collection</button>
                </div>
            </div>
        </section>
    )
}

export default Hero
