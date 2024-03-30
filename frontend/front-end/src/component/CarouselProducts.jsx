import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import product from "@/public/product1.svg"
import product2 from "@/public/chauffage.svg"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'

const CarouselProducts = ({ backgroundColor, category }) => {
    const arrayProducts = [product, product2, product, product2, product2]

    return (
        <section className={`p-5  ${backgroundColor}`
        }>
            <h1 className='text-white p-2 text-xl font-bold'>{category}</h1>
            <Swiper
                navigation={true}
                className='w-[90%] mx-auto flex justify-end items-center'
                spaceBetween={50}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Navigation]}
            >
                {
                    arrayProducts.map(pro => {
                        return (
                            <div className='bg-white'>
                                <SwiperSlide>
                                    <div className='pb-5 pt-10 px-4 w-full text-center rounded-md bg-white  '>
                                        <img className='h-[200px] mx-auto' src={pro} />
                                        <div className='p-2'>
                                            <p className='border-b-[0.8px] font-medium text-lg border-neutral-800   mx-auto '>Cuisinière</p>

                                            <p className='text-[#1E1E1E] text-md font-medium opacity-[50%]'>700da / mois</p>

                                        </div>
                                        <button className=' text-white px-2 py-1   bg-Primary-500 rounded-xl'>Plus d'infos</button>
                                    </div>
                                </SwiperSlide>
                            </div>
                        )
                    })
                }


            </Swiper>
        </section >
    )
}

export default CarouselProducts
