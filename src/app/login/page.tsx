import React, { useState } from 'react';
import Head from 'next/head';
import LoginForm from './form';
import Loader from '../ui/loader/Loader';
import { boolean } from 'yup';


export default function LoginPage() {

  return (
    <>
      <Head>
        <title>Login | Foodies</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center">
        <LoginForm />
      </main>
    </>
  );
}