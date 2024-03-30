import React from 'react'
import Logo from "@/public/Logo.svg"
import PanierIcon from "@/public/Icons/panierIcon.svg"
import rechIcon from "@/public/Icons/rechIcon.svg"
const Navbar = () => {
    return (
        <nav className='flex z-[9999] top-4 right-0 left-0 fixed py-3 w-[85%]  px-10 text-Primary-100 rounded-[200px] text-white items-center bg-Secondary-700 opacity-[70%]  justify-between mx-auto'>
            <div className='flex items-center gap-2 '>
                <img className='w-[64px] h-[64px]' src={Logo} />
                <h1>Takssit</h1>
            </div>
            <h3>Accueil</h3>
            <h3>Catégories</h3>
            <h3>Produits</h3>
            <div className='flex'>
                <input className=' px-2 py-1 bg-[#1A7887] border-b outline-0 border-b-2' />
                <img src={rechIcon} />
            </div>
            <div>
                <img src={PanierIcon} />
            </div>
        </nav>
    )
}

export default Navbar
