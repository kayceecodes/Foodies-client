"use client";

import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FormikState,
  FormikProps,
} from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Loader from "../components/ui/loader/Loader";
import {
  AuthError,
  AuthSuccessResponse,
  LoginRequest,
  LoginResponse,
} from "../../../types/auth";
import { ApiResult } from "../../../types/api";
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";

interface FormValues {
  email: string;
  password: string;
}

interface FormStatus {
  error?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (
    values: LoginRequest,
    formikHelpers: FormikHelpers<LoginRequest>
  ) => {
    const { setSubmitting, setStatus } = formikHelpers;
    setSubmitting(true);
    let response: AuthSuccessResponse | undefined = undefined;

    try {
      response = await login(values);
      if (response.success) {
        //onSuccess?.();
        // alert(JSON.stringify(values, null, 2));
        //await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/");
        return;
      }
      setStatus({ error: response.message || "Invalid credentials!" });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setStatus({ error: message });
    } finally {
      if (!response?.success)
        // prevent state update after navigation
        setSubmitting(false);
    }
  };

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // const isFormFieldInvalid = (formik: FormikProps<FormValues>, fieldName: string) => {
  //     return !!(formik.touched[fieldName as keyof FormValues] && formik.errors[fieldName as keyof FormValues]);
  // }

  const isFormFieldInvalid = (
    formik: FormikProps<FormStatus>,
    fieldName: string
  ) => {
    return;
  };

  return (
    <AnimatePresence>
      <Formik
        initialValues={{ email: "Hiddle@gmail.com", password: "somepw" }} // loginCredentials would be used here
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <div className="mx-6 px-8 py-12 rounded-lg border-stone-700 bg-neutral-800 border-[0.9px] w-96 container">
            <h1 className="text-2xl font-bold mb-6 text-center text-neutral-300">
              Login to Foodies
            </h1>
            <Form className="flex justify-center flex-col">
              {formik.status?.error && (
                <motion.div
                  key="status-errors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="text-red-500 text-xs text-center border border-0.9 border-stone-700 rounded-sm max-w-1/3 mx-auto px-2 py-0.5">
                    {formik.status?.error}
                  </div>
                </motion.div>
              )}
              {/* <div className={`transition-opacity duration-500 ease-in-out ${status?.errors ? "opacity-0" : "opacity-100"}`}>
                            {status?.error ? status.error : ""}
                        </div> */}
              <div className="mb-6 text-neutral-300">
                <label htmlFor="email" className="w-full text-sm">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  disabled={formik.isSubmitting}
                  className="w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  className="text-red-600 text-sm absolute"
                  name="email"
                  component="div"
                />
              </div>
              <div className="mb-6 text-neutral-300">
                <label htmlFor="password" className="w-full text-sm">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  disabled={formik.isSubmitting}
                  className="mb-4 w-full px-3 py-2 text-gray-300 border bg-neutral-700 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-800"
                />
              </div>
              <Button
                type="submit"
                label="Submit"
                className=" border-stone-500 rounded border-[0.9px] py-2"
                disabled={formik.isSubmitting}
              />
            </Form>
            <div className="text-center text-xs mt-4">
              Don't have an account{" "}
              <Link className="" href="/signup">
                <u>sign up</u>
              </Link>{" "}
              today.
            </div>
          </div>
        )}
      </Formik>
    </AnimatePresence>
  );
}
