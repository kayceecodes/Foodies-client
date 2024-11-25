'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn: number;
}
interface LoginCredentials {
    username: string;
    password: string;
  }

export default function LoginForm() {
    const [loginData, setLoginData] = useState<LoginCredentials>({
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
      
      const Login = async (loginCredentials: LoginCredentials) => {
        
        try {
          const response = await fetch("http://localhost:5155/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
          })

          if(!response.ok)
            throw new Error('Failed to log in');

          const data: LoginResponse = await response.json();

          return data;
        }
          catch(error) {
            console.log("Error: ", error)
          }
      }

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Implement login logic here
        await Login({
          username: loginData.username,
          password: loginData.password
        })

        console.log('Login data:', loginData);
        // If login is successful, redirect to home page
        router.push('/');
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
          className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
