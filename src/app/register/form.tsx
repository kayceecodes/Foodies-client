'use client'

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import Loader from '../components/ui/loader/Loader';
import ValidationSchema from './validationSchema';
import { AuthSuccessResponse, RegisterRequest } from '../../../types/auth';
import { ApiResult } from '../../../types/api';

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
    const router = useRouter();
    const initialValues: UserData = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'jdoe',
        email: 'jdoe@gmail.com',
        password: 'somepw',
        streetAddress: '123 E Union St.',
        state: 'WA',
        zipcode: '98039'
    }

    const RegisterRoute = async (user: UserData) => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
    }
    class AuthError extends Error {
        readonly statusCode: number;  
        constructor(message: string, statusCode: number) {
            super(message);
            this.name = "AuthError";
            this.statusCode = statusCode;
        }
    }      
        
    const register = async (userData: RegisterRequest): Promise<AuthSuccessResponse> => {
        try {
        const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
        });

        const apiResult: ApiResult<null> = await response.json().catch(() => ({}));
        
        if (!response.ok || !apiResult.isSuccess) {
        throw new AuthError(
            apiResult.message || 'Registration failed',
            response.status
        );
        }

        return { success: true, message: apiResult.message || 'Registration successful' };
    } catch (error) {
        if (error instanceof AuthError) {
            throw error;
        }
            throw new AuthError('Network error during registration', 500);
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
                    onSubmit={async (values, { setSubmitting }) => {
                        // await Register(values);
                        await RegisterRoute(values);
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
