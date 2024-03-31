import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormulaireConfirmation = () => {
    return (
        <Formik
            initialValues={{ location, firstName: '', lastName: '', email: '' }}
            validationSchema={
                Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            <Form className=' w-[60%] items-center  bg-red-200    font-Poppins'>
                <div className='flex px-3 gap-10'>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="firstName">First Name</label>
                        <Field className="bg-red-100" name="firstName" type="text" />
                        <ErrorMessage className='text-red-600' name="firstName" />
                    </div>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" type="text" />
                        <ErrorMessage className='bg-red-300' name="lastName" />
                    </div>
                </div>
                <div className='flex px-3 gap-10'>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" type="text" />
                        <ErrorMessage className='bg-red-300' name="lastName" />
                    </div>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" type="text" />
                        <ErrorMessage className='bg-red-300' name="lastName" />
                    </div>
                </div>
                <div className='flex px-3 gap-10'>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="location" type="text" component="select">
                            <option value="NY">New York</option>
                            <option value="SF">San Francisco</option>
                            <option value="CH">Chicago</option>
                            <option value="OTHER">Other</option>
                        </Field>
                        <ErrorMessage className='bg-red-300' name="location" />
                    </div>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="location" type="text" component="select">
                            <option value="NY">New York</option>
                            <option value="SF">San Francisco</option>
                            <option value="CH">Chicago</option>
                            <option value="OTHER">Other</option>
                        </Field>
                        <ErrorMessage className='bg-red-300' name="location" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <label htmlFor="lastName">Last Name</label>
                    <Field as='textarea' name="lastName" type="text" />
                    <ErrorMessage className='bg-red-300' name="lastName" />
                </div>
                <div className='flex px-3 gap-10'>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="location" type="text" component="select">
                            <option value="NY">New York</option>
                            <option value="SF">San Francisco</option>
                            <option value="CH">Chicago</option>
                            <option value="OTHER">Other</option>
                        </Field>
                        <ErrorMessage className='bg-red-300' name="location" />
                    </div>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="location" type="text" component="select">
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