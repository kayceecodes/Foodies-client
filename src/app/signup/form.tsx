'use client'

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import Loader from '../components/ui/loader/Loader';
import ValidationSchema from './validationSchema';
import { AuthSuccessResponse, SignupRequest } from '../../../types/auth';
import { ApiResult } from '../../../types/api';
import { signupUser } from '../../../utils/auth';
import { useAuth } from '../../../hooks/useAuth';

interface SignupResponse {
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

export default function SignupForm() {
    const [isLoading, setLoading] = useState<boolean>();
    const router = useRouter();
    const { signup } = useAuth();
    const initialValues: SignupRequest = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'jdoe',
        email: 'jdoe@gmail.com',
        password: 'Somepw23!',
        streetAddress: '123 E Union St.',
        city: 'Seattle',
        state: 'WA',
        zipcode: '98039'
    }

    const handleSubmit = async (values: SignupRequest, formikHelpers: FormikHelpers<SignupRequest>) => {
        const { setSubmitting, setStatus, setFieldError } = formikHelpers;
        setLoading(true);
        setStatus('');
        setSubmitting(true);

        try {
            const response = await signup(values);
            if (response.success) {
                //onSuccess?.();
                setTimeout(async () => {
                    // alert(JSON.stringify(values, null, 2));
                } , 500);
                router.push('/');
            }
        } catch(error: unknown) {
            if (error instanceof Error) {
                // If your API returns field-level errors you can call setFieldError(field, message)
                // e.g. setFieldError('email', 'Email already taken')
                setStatus(error.message || 'Sign up failed!');
            }
        } finally {
            setLoading(false);
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
                    validationSchema={ValidationSchema}
                    onSubmit={handleSubmit}
                >
                {({ isSubmitting, errors, status }) => (
                    <Form className="flex justify-center flex-col">
                        {status && <div className="border-e-red-700 text-red-600">{status}</div>}
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
                        <button type="submit" onClick={() => console.log("Submit Hit!")} className="border-stone-600 rounded border-2 py-2 my-4" disabled={isSubmitting}>
                            
                            Submit
                        </button>
                    </Form>
                )}
                </Formik>

                <div className="text-center text-xs mt-4">Already a user <u>log in</u> to your account.</div>
            </div>
)};
