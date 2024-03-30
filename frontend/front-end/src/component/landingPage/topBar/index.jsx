import React from 'react'
import instaIcon from "@/public/Icons/instaIcon.svg"
import mailIcon from "@/public/Icons/mailIcon.svg"
import fbIcon from "@/public/Icons/fbIcon.svg"
import telIcon from "@/public/Icons/telIcon.svg"
const TopBar = () => {
    return (
        <section className='fixed w-full z-[9999] top-[710px] flex justify-center gap-20 px-10 mx-auto items-center text-white bg-Secondary-900'>
            <div className='flex items-center gap-4'>
                <img src={telIcon} />
                <h6>0982 34 45 45</h6>
            </div>
            <div className='flex items-center gap-4'>
                <img src={mailIcon} />
                <h6>takssit.contact@gmailcom</h6>
            </div>
            <h6>
                Suivez nous sur les reaseau pour pas ratter les nouvelle
            </h6>
            <div className='flex  gap-4'>
                <a><img className='' src={instaIcon} /></a>
                <a><img className='' src={fbIcon} /></a>
            </div>
        </section >
    )
}

export default TopBar
