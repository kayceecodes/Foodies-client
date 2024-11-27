import Head from 'next/head';
import React from 'react';
import RegisterForm from './form';

export default function RegisterPage() {
  return (
    <>
    <Head>
      <title>Register | Foodies</title>
    </Head>
    <main className="min-h-screen flex items-center justify-center">
      <RegisterForm />
    </main>
  </>
  );
}
