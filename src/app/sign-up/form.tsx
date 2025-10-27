"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import Loader from "../components/ui/loader/Loader";
import ValidationSchema from "./validationSchema";
import { SignupRequest } from "../../../types/auth";
import { useAuth } from "../../hooks/useAuth";

export default function SignupForm() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { signup } = useAuth();

  //const initialValues: SignupRequest = {
  //firstName: '',
  //lastName: '',
  //username: '',
  //email: '',
  //password: '',
  //streetAddress: '',
  //city: '',
  //state: '',
  //zipcode: ''
  //}
  const initialValues: SignupRequest = {
    firstName: "Jon",
    lastName: "Wu",
    username: "jonWu",
    email: "jwu@gmail.com",
    password: "Somepw23!",
    streetAddress: "23 Union St",
    city: "Seattle",
    state: "WA",
    zipcode: "00000",
  };

  const handleSubmit = async (
    values: SignupRequest,
    formikHelpers: FormikHelpers<SignupRequest>
  ) => {
    const { setSubmitting, setStatus } = formikHelpers;
    setLoading(true);
    setStatus("");

    try {
      console.log("handleSubmit called with:", values); // Debug log
      const response = await signup(values);

      if (response.success) {
        console.log("Signup successful, redirecting...");
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Signup error:", error.message);
        setStatus(error.message || "Sign up failed!");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="mx-6 px-6 py-10 md:px-8 md:py-12 rounded-lg border-stone-700 bg-neutral-800 border-[0.9px] container max-w-screen-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Sign up with Foodies
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="flex justify-center flex-col">
            {status && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded mb-3">
                {status}
              </div>
            )}

            {/* Add missing firstName field */}
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <label htmlFor="firstName" className="w-full">First Name</label>
                    <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                    className="text-red-600 text-sm"
                    name="firstName"
                    component="div"
                    />
                </div>
                
                <div>
                    <label htmlFor="lastName" className="w-full">Last Name</label>
                    <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                    className="text-red-600 text-sm"
                    name="lastName"
                    component="div"
                    />
                </div>

                <div>
                    <label htmlFor="username" className="w-full">Username</label>
                    <Field
                    type="text"
                    name="username"
                    id="username"
                    className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                    className="text-red-600 text-sm"
                    name="username"
                    component="div"
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="w-full">Email</label>
                    <Field
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                    className="text-red-600 text-sm"
                    name="email"
                    component="div"
                    />
                </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password" 
                className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                className="text-red-600 text-sm"
                name="password"
                component="div"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="mb-3">
                <label htmlFor="streetAddress">Street Address</label>
                <Field
                    type="text"
                    name="streetAddress"
                    id="streetAdress"
                    className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                    className="text-red-600 text-sm"
                    name="streetAddress"
                    component="div"
                />
                </div>

                {/* Add missing city field */}
                <div className="mb-3">
                <label htmlFor="city">City</label>
                <Field
                    type="text"
                    name="city"
                    id="city"
                    className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                    className="text-red-600 text-sm"
                    name="city"
                    component="div"
                />
                </div>

                <div className="mb-3">
                <label htmlFor="state">State</label>
                <Field
                    type="text"
                    name="state"
                    id="state"
                    className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                    className="text-red-600 text-sm"
                    name="state"
                    component="div"
                />
                </div>

                <div className="mb-3">
                <label htmlFor="zipcode">Zipcode</label>
                <Field
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                    className="text-red-600 text-sm"
                    name="zipcode"
                    component="div"
                />
                </div>
            </div>
            <button
              type="submit"
              className="border-stone-700 rounded border-[0.9px] py-2 my-4 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="text-center text-xs mt-4">
        Already a user? <u className="cursor-pointer">log in</u> to your
        account.
      </div>
    </div>
  );
}
