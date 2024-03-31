import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import product from "@/public/product1.svg"
import product2 from "@/public/chauffage.svg"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import CardProduct from './CardProduct';



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
                                <SwiperSlide key={Math.random() * Math.random()}>
                                    <CardProduct src={pro} />
                                </SwiperSlide>
                            </div>
                        )
                    })
                }
            </Swiper>
        </section>
    )
}

export default CarouselProducts
