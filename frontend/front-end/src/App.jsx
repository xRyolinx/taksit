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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/about' element={<h1>about</h1>} />
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </Router>

  )
}

export default App
