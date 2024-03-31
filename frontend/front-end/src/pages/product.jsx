import React from 'react'
import product from "@/public/product1.svg"
const Product = () => {
    return (
        <section>
            <section className=''>
                <div className='flex gap-10 mx-aut items-center'>
                    <img src={product} />

                    <div>
                        <h1>MICRO ONDE ENCASTRABLE 25Lt BLANC AVEC G</h1>
                        <h2>-Mensualités :</h2>
                        <p>
                            5102,50 DA / moissur 12 mois mois
                            <br />
                            2593,51 DA / mois sur 24 mois mois
                            <br />
                            1808,93 DA / mois sur 36 mois mois
                            <br />
                            1204,17 DA / mois sur 60 mois mois
                        </p>
                    </div>
                </div>
                <button className='bg-Secondary-900 p-4 rounded-xl text-white'>Ajouter au panier</button>
            </section>
            <section>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.

                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.

                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.

                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </section>

        </section>
    )
}

export default Product
