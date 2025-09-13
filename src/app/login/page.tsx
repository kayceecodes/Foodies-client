import React, { useState } from 'react';
import LoginForm from './form';
import Loader from '../components/ui/loader/Loader';
import { boolean } from 'yup';


export default function LoginPage() {

  return (
    <div>
      <main className="min-h-screen flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
}