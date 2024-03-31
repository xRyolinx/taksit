import { useState } from 'react'
import { Suspense, lazy } from "react"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Product = lazy(() => import('./pages/product'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
import Navbar from './component/landingPage/navbar';
import SideBar from './component/SideBar';
import TopBar from './component/landingPage/topBar';
const Panier = lazy(() => import('./pages/Panier'));


import { LazyLoadImage } from 'react-lazy-load-image-component';
import Product1 from '@/public/product1.svg';
import blur from "@/public/blur.jpg"

function App() {

  return (
    <>
      {/* <LazyLoadImage
        effect={blur}
        src={Product1}
        width={300} height={300}
        placeholderSrc={blur}
        alt='image product' /> */}
      <Navbar />
      <TopBar />
      <SideBar />
      <Router>
        <Routes>
          <Route path='/' element={
            <Suspense>
              <LandingPage />
            </Suspense>
          } />
          <Route path="/product" element={
            <Suspense>
              <Product />
            </Suspense>
          } />
          <Route path='/Products' element={
            <Suspense>
              <AllProducts />
            </Suspense>
          } />
          <Route path='/Panier' element={
            <Suspense>
              <Panier />
            </Suspense>
          } />
        </Routes>
      </Router>
    </>

  )
}

export default App
