import React from 'react'
import Logo from "@/public/Logo.svg"
import telIcon from "@/public/Icons/telIcon.svg"
import fbIcon from "@/public/Icons/fbIcon.svg"
import instaIcon from "@/public/Icons/instaIcon.svg"
const Section3 = () => {
    return (
        <section className='px-[129px] bg-Primary-900' >
            <section className='py-10  text-white  flex w-full justify-between'>
                <div className='flex gap-1 items-center'>
                    <img src={Logo} />
                    <div>
                        <h1 className='text-xl font-bold text-white'>Takssit</h1>
                        <p>La vente par facilité, par excellence.</p>
                    </div>
                </div>
                <div className='space-y-5'>
                    <h1 className='font-bold text-[28px]'>
                        Quelques Liens Rapides
                    </h1>
                    <div className='flex items-center flex-col text-center space-y-2'>
                        <button className=' bg-Primary-100 rounded-md text-Primary-700 px-2 py-1'>Nos produits</button>
                        <button className='bg-Primary-100 rounded-md text-Primary-700 px-2 py-1'>Dossier à fournir</button>
                    </div>
                </div>
                <div className='space-y-5 flex flex-col items-center text-center'>
                    <h1 className='font-bold text-[28px]'>
                        Pour Plus D’information</h1>
                    <div className='space-y-3'>
                        <div className='flex text-center gap-4 items-center'>
                            <img src={telIcon} />
                            <h3>0982 34 45 45</h3>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <img src={telIcon} />
                            <h3>0982 34 45 45</h3>
                        </div>
                    </div>
                </div>
            </section>
            <div className='h-[1px] my-4 w-full bg-Primary-100'></div>
            <section className='pb-12 text-white flex justify-between'>
                <div>
                    <h5> Copyright ©2024 Tous droits réservés ....  Service Client</h5>
                </div>
                <div className='flex gap-4 mr-10 '>
                    <a> <img src={fbIcon} /></a>
                    <span>Retrouvez-nous</span>
                    <a> <img src={instaIcon} /></a>

                </div>
            </section>
        </section>

    )
}

export default Section3
