import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCommanderMutation } from '../api/features/apiSlice';

const FormulaireConfirmation = () => {
    const [commander, response] = useCommanderMutation();
    return (
        <Formik
            initialValues={{ nom: "", commune: "", wilaya: "", mode_livraison: "", adresse_complete: "", telephone: "" }}
            // validationSchema={
            //     Yup.object({
            //         firstName: Yup.string()
            //             .max(15, 'Must be 15 characters or less')
            //             .required('Required'),
            //         lastName: Yup.string()
            //             .max(20, 'Must be 20 characters or less')
            //             .required('Required'),
            //         email: Yup.string().email('Invalid email address').required('Required'),
            //     })}
            onSubmit={(values, { setSubmitting }) => {
                const dataSend = {
                    nom: "amine darmouni",
                    telephone: "0779933302",
                    wilaya: "alger",
                    commune: "alger",
                    adresse_complete: "alger",
                    mode_livraison: "liv",
                    salaire: 10,
                    produits: [
                        {
                            'produit_id': 1,
                            'mensualite_id': 1,
                            'quantite': 1,
                        }
                    ],
                }
                try {
                    commander(dataSend).unwrap().then((res) => {
                        console.log(res)
                    });
                    console.log("response", response)

                } catch (err) {

                }
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));

                    setSubmitting(false);
                }, 400);
            }}
        >
            <Form className=' w-[80%] mx-auto  bg-red-200 flex flex-col gap-10 font-Poppins'>
                <div className='flex px-3 gap-10'>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label className='font-[600] text-lg' htmlFor="nom">Nom Complet</label>
                        <Field className="mt-2 border-1 py-3 rounded-md bg-white text-neutral-500 outline-none px-2 bg-red-100" name="firstName" type="text" />
                        <ErrorMessage className='text-red-600' name="nom" />
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label className='font-[600] text-lg' htmlFor="telephone">Telphone</label>
                        <Field className="mt-2 border-1 py-3 rounded-md bg-white text-neutral-500 outline-none px-2 bg-red-100" name="telephone" type="text" />
                        <ErrorMessage className='text-red-600' name="telephone" />
                    </div>
                </div>

                <div className='flex px-3 gap-10'>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label className='font-[600] text-lg' htmlFor="wilaya">Wilaya</label>
                        <Field className="mt-2 border-1 py-3 rounded-md bg-white text-neutral-500 outline-none px-2 bg-red-100" name="wilaya" type="text" component="select">
                            <option value="NY">New York</option>
                            <option value="SF">San Francisco</option>
                            <option value="CH">Chicago</option>
                            <option value="OTHER">Other</option>
                        </Field>
                        <ErrorMessage className='bg-red-300' name="location" />
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label className='font-[600] text-lg' htmlFor="commune">Commune</label>
                        <Field className="mt-2 border-1 py-3 rounded-md bg-white text-neutral-500 outline-none px-2 bg-red-100" name="commune" type="text" component="select">
                            <option value="NY">New York</option>
                            <option value="SF">San Francisco</option>
                            <option value="CH">Chicago</option>
                            <option value="OTHER">Other</option>
                        </Field>
                        <ErrorMessage className='bg-red-300' name="location" />
                    </div>
                </div>
                <div className='flex flex-col gap-2 px-4 flex-1'>
                    <label className='font-[600] text-lg' htmlFor="adresse_complete">Votre Address Complète</label>
                    <Field as="textarea" row={10} className="mt-2 h-[150px] resize-none border-1 py-3 rounded-md bg-white text-neutral-500 outline-none px-2 bg-red-100" name="adresse_complete" type="text" />
                    <ErrorMessage className='text-red-600' name="firstName" />
                </div>
                <div className='flex px-3 gap-10'>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label className='font-[600] text-lg' htmlFor="lastName">Mode De Livraison</label>
                        <Field className="mt-2 border-1 py-3 rounded-md bg-white text-neutral-500 outline-none px-2 bg-red-100" name="mode_livraison" type="text" component="select">
                            <option value="NY">New York</option>
                            <option value="SF">San Francisco</option>
                            <option value="CH">Chicago</option>
                            <option value="OTHER">Other</option>
                        </Field>
                        <ErrorMessage className='bg-red-300' name="location" />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default FormulaireConfirmation