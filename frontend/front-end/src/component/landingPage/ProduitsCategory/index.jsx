import React from 'react'
import CarouselProducts from '../../CarouselProducts'

const ProduitsCategory = () => {
    return (
        <section className='text-center '>
            <header className='py-20'>
                <h1 className=' text-neutral-800 text-xl '>Découvrez</h1>
                <h1 className=' text-Secondary-700 text-2xl font-bold'>Nos Catégories</h1>
            </header>
            <CarouselProducts backgroundColor={"bg-Secondary-700"} category={"Electroménage"} />
            <CarouselProducts backgroundColor={""} category={"Electroménage"} />
            <CarouselProducts backgroundColor={"bg-Secondary-700"} category={"Electroménage"} />

        </section>
    )
}

export default ProduitsCategory
