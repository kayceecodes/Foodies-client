'use client'

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Loader from '../components/ui/loader/Loader';
import { AuthError, AuthSuccessResponse, LoginRequest, LoginResponse } from '../../../types/auth';
import { ApiResult } from '../../../types/api';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (values: LoginRequest, formikHelpers: FormikHelpers<LoginRequest>) => {
        const { setSubmitting, setStatus } = formikHelpers;
        setSubmitting(true);
        let response: AuthSuccessResponse | undefined = undefined;

        try {
            response = await login(values);
            if (response.success) {
                //onSuccess?.();
                // alert(JSON.stringify(values, null, 2));
                //await new Promise((resolve) => setTimeout(resolve, 1000));
                router.push('/');
                return;
            }
            setStatus({error: response.message || 'Invalid credentials!'})
        } catch(error: unknown) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            setStatus({ error: message });
        } finally {
            if (!response?.success) // prevent state update after navigation
                setSubmitting(false);
        }
    }
 
    const schema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    return (    
        <div>  
            <Formik
                initialValues={{ email: 'tHiddle@gmail.com', password: 'somepw' }}// loginCredentials would be used here
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
            {({ isSubmitting, status }) => (

                isSubmitting ? 
                <Loader /> 
                :
                <div className='mx-6 px-8 py-12 rounded-lg border-stone-700 bg-neutral-800 border-[0.9px] w-96 container'>
                    <h1 className="text-2xl font-bold mb-6 text-center text-neutral-300">
                        Login to Foodies
                    </h1>
                    <Form className="flex justify-center flex-col">
                        {status?.error && <div className="invisible opacity-0 transition-opacity duration-750">{status.error}</div>}
                        <div className='mb-6 text-neutral-300'>
                            <label htmlFor="email" className="w-full text-sm">Email</label>
                            <Field type="email" name="email" disabled={isSubmitting} className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage className="text-red-600 text-sm absolute" name="email" component="div" />
                        </div>
                        <div className='mb-6 text-neutral-300'>
                            <label htmlFor="password" className="w-full text-sm">Password</label>
                            <Field type="password" name="password" disabled={isSubmitting} className="mb-4 w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage name="password" component="div" className="text-red-800" />
                        </div>
                        <button type="submit" className="border-stone-500 rounded border-[0.9px] py-2" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                    <div className="text-center text-xs mt-4">
                        Don't have an account <Link className="" href="/signup"><u>sign up</u></Link> today. 
                    </div>
                </div>
            )}
            </Formik>
        </div>
)};
