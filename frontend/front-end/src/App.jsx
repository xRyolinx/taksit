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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>

  )
}

export default App
