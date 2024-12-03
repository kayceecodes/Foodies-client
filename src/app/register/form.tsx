'use client'

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Loader from '../ui/loader/Loader';
import ValidationSchema from './validationSchema';

interface RegisterResponse {
    token: string
    refreshToken?: string
    expiresIn: number
}
interface UserData {
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
    
    const RegisterRoute = async ({email, username, password}: UserData) => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    }

    const Register = async (UserData: UserData) => {    
        try {
                
            const response = await fetch("http://localhost:5156/api/auth/Register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserData)
            })

            if(!response.ok)
            throw new Error('Failed to log in');

            const data: RegisterResponse = await response.json();

            return data;
        }
          catch(error) {
            console.log("Error: ", error)
        }
    }

    const initialValues: UserData = {
        username: 'jdoe',
        email: 'jdoe@gmail.com',
        password: 'somepw',
        streetAddress: '123 E Union St.',
        state: 'WA',
        zipcode: '98039'
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
