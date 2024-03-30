import React from 'react'

const Section1 = () => {
    return (
        <section className='flex-col gap-x-[100px] gap-4 lg:justify-between lg:items-center lg:flex-row  bg-Secondary-300 flex py-[35px] px-[129px]'>
            <div className='max-w-[400px]'>
                <h2 className='text-[32px] font-bold text-Secondary-900'>Service Client</h2>
                <p className='text-[18px]'>Entrez votre numéro de téléphone
                    Nous vous appellerons pour vous aider.</p>
            </div>
            <div className='flex-1 bg-white  py-1 px-2 rounded-lg font-medium items-center gap-2 flex'>
                <span className='text-Secondary-700'>+213</span>
                <input placeholder='xxx xx xx xx' className='outline-none flex-1' />
                <button className='font-semibold px-[16px] text-white rounded-lg bg-Secondary-700 py-[8px]'>
                    Valider
                </button>
            </div>
        </section>
    )
}

export default Section1
