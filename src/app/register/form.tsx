'use client'

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import Loader from '../components/ui/loader/Loader';
import ValidationSchema from './validationSchema';
import { AuthSuccessResponse, RegisterRequest } from '../../../types/auth';
import { ApiResult } from '../../../types/api';
import { register } from '../../../utils/auth';

interface RegisterResponse {
    token: string
    refreshToken?: string
    expiresIn: number
}
interface UserData {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    streetAddress: string,
    state: string,
    zipcode: string
}

export default function RegisterForm() {
    const [isLoading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string>();
    const router = useRouter();
    const initialValues: RegisterRequest = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'jdoe',
        email: 'jdoe@gmail.com',
        password: 'somepw',
        streetAddress: '123 E Union St.',
        city: 'Seattle',
        state: 'WA',
        zipcode: '98039'
    }

    const handleSubmit = async (values: RegisterRequest, formikHelpers: FormikHelpers<RegisterRequest>) => {
        const { setSubmitting } = formikHelpers;
        setLoading(true);
        setError('');
        setSubmitting(true);

        try {
            const response = await register(values);
            if (response.success) {
                //onSuccess?.();
                router.push('/');
                setTimeout(async () => {
                    // alert(JSON.stringify(values, null, 2));
                    router.push('/');
                } , 500);
            }
        } catch(error: unknown) {
            if (error instanceof Error)
            setError(error.message || 'Registration failed!');
        } finally {
            setLoading(true);
            setSubmitting(false);
        }
    }
    
    return (      
            isLoading ? 
            <Loader /> 
              :
            <div className='p-8 rounded-lg border-stone-500 border-2 w-96 container'>
                <h1 className="text-2xl font-bold mb-6 text-center">Sign up with Foodies</h1>
                <Formik
                    initialValues={initialValues}
                    validateSchema={ValidationSchema}
                    onSubmit={handleSubmit}
                >
                {({ isSubmitting, errors }) => (
                    <Form className="flex justify-center flex-col">
                        <div className='mb-3'>
                            <label htmlFor="username">Username</label>
                            <Field type="username" name="username" className="w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage className="text-red-600 text-sm absolute" name="username" component="div" />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage className="text-red-600 text-sm absolute" name="email" component="div" />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className="mb-4 w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage name="password" component="div" className="text-red-800" />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="streetAddress">Street Address</label>
                            <Field type="text" name="streetAddress" className="w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage className="text-red-600 text-sm absolute" name="streetAddress" component="div" />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="state">State</label>
                            <Field type="text" name="state" className="w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage className="text-red-600 text-sm absolute" name="state" component="div" />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="zipcode">Zipcode</label>
                            <Field type="dropdown" name="zipcode" className="w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage className="text-red-600 text-sm absolute" name="zipcode" component="div" />
                        </div>
                        <button type="submit" className="border-stone-600 rounded border-2 py-2 my-4" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
                </Formik>
            </div>
)};
