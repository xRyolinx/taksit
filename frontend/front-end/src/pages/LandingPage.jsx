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
            <TopBar />
            <ProduitsCategory />
            {/* <ProduitsCategory /> */}
            <Footer />
        </section>
    )
}

export default LandingPage
