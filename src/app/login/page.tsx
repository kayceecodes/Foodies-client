import React, { useState } from 'react';
import Head from 'next/head';
import LoginForm from './form';


export default function LoginPage() {
  
  return (
    <>
      <Head>
        <title>Login | Foodies</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center">
        <div className='h-80 p-8 rounded-lg border-stone-500 border-2 w-96 container'>
          <h1 className="text-2xl font-bold mb-6 text-center">Login to Foodies</h1>
          <LoginForm />
        </div>
      </main>
    </>
  );
}