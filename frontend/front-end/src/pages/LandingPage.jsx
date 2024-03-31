import TopBar from '@/src/component/landingPage/topBar'
import React from 'react'
import Navbar from '../component/landingPage/navbar'
import Hero from '../component/landingPage/hero'
import CarouselProducts from '../component/CarouselProducts'
import Footer from '../component/landingPage/footer'
import ProduitsPopular from '../component/landingPage/ProduitPopular'
import ProduitsCategory from '../component/landingPage/ProduitsCategory'

const LandingPage = () => {
    return (
        <section>
            <Navbar />
            <div className=''>
                <Hero />
            </div>
            <div className='width-full h-[100vh] bg-red-950 z-[9999999999] absolute'>
                <TopBar />
            </div>
            <ProduitsCategory />
            {/* <ProduitsCategory /> */}
            <Footer />
        </section>
    )
}

export default LandingPage
