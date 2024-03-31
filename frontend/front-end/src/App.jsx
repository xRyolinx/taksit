import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Product from './pages/product';
import AllProducts from './pages/AllProducts';
import CardsProducts from './component/CardsProducts';
import Navbar from './component/landingPage/navbar';
import TopBar from './component/landingPage/topBar';

function App() {

  return (
    <>
      <Navbar />
      <TopBar />
      <Router>
        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path="/product" element={<Product />} />
          <Route path='/Products' element={<AllProducts />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
