'use client'

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


export default function LoginForm() {
    return (
        <div className='h-80 p-8 rounded-lg border-stone-500 border-2 w-96 container'>
            <h1>Any place in your app!</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                const errors = {
                    email: ""
                };
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
                }}
            >
                {({ isSubmitting }) => (
                <Form className="flex justify-center flex-col">
                    <Field type="email" name="email" className="w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage className="text-red-600 mb-2" name="email" component="div" />
                    <Field type="password" name="password" className="w-full mb-2 px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="password" component="div" className="text-red-600 mb-2" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
                )}
            </Formik>
        </div>
)};
