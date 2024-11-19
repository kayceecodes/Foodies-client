'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface LoginState {
    username: string;
    password: string;
  }

export default function LoginForm() {
    const [loginData, setLoginData] = useState<LoginState>({
        username: '',
        password: '',
      });
      const router = useRouter();
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Implement login logic here
        console.log('Login data:', loginData);
        // If login is successful, redirect to home page
        // router.push('/');
      };

    return (
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={loginData.username}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={loginData.password}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Log In
    </button>
  </form>
  );
}
