'use client'

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Loader from '../components/ui/loader/Loader';
import { AuthError, AuthSuccessResponse, LoginRequest, LoginResponse } from '../../../types/auth';
import { ApiResult } from '../../../types/api';

export default function LoginForm() {
    const [isLoading, setLoading] = useState<boolean>();
    const router = useRouter();
    const [loginRequest, setLoginRequest] = useState<LoginRequest>();

    const Login = async (loginRequest: LoginRequest): Promise<AuthSuccessResponse> => {    
        try {
                
            const response = await fetch("http://localhost:5156/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(loginRequest)
            })

            const apiResult: ApiResult<LoginResponse> = await response.json().catch(() => {});

            if(!response.ok) {
                    throw new AuthError(apiResult.message || 'Failed to log in', response.status);
            }

         return { success: true, message: apiResult.message || 'Login Successful' };
        } catch (error) {

            if (error instanceof AuthError) {
                throw error;
            }

            throw new AuthError('Network Error', 500);
        }
}
    const schema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    return (      
            isLoading ? 
            <Loader /> 
              :
            <div className='h-80 p-8 rounded-lg border-stone-500 border-2 w-96 container'>
                <h1 className="text-2xl font-bold mb-6 text-center">Login to Foodies</h1>
                <Formik
                    initialValues={{ email: 'jillrue@gmail.com', password: 'somepw' }}// loginCredentials would be used here
                    validateSchema={schema}
                    onSubmit={async (values, { setSubmitting }) => {
                        await Login(values);
                        //await LoginRoute(values);
                        setLoading(true);
                        setSubmitting(true);
                        setTimeout(async () => {
                            // alert(JSON.stringify(values, null, 2));
                            router.push('/');
                        } , 800);
                    }}
                >
                {({ isSubmitting, errors }) => (
                    <Form className="flex justify-center flex-col">
                        <div className='mb-6'>
                            <Field type="email" name="email" className="w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage className="text-red-600 text-sm absolute" name="email" component="div" />
                        </div>
                        <div className='mb-6'>
                            <Field type="password" name="password" className="mb-4 w-full px-3 py-2 text-zinc-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage name="password" component="div" className="text-red-800" />
                        </div>
                        <button type="submit" className="border-stone-600 rounded border-2 py-2" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
                </Formik>
            </div>
)};
