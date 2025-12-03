"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import Loader from "../components/ui/loader/Loader";
import ValidationSchema from "./validationSchema";
import { SignupRequest } from "../../../types/auth";
import { useAuth } from "../../hooks/useAuth";
import FormikTextField from "../login/FormikTextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Link from "next/link";

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
    <div className="mx-6 px-12 py-12 md:px-16 text-center bg-glass rounded-lg border-stone-700 bg-neutral-800 border-[0.9px] container max-w-lg lg:max-w-xl">
      <PermIdentityIcon sx={{ fontSize: 55, marginBottom: "12px" }} />
      <h1 className="text-2xl font-bold mb-6 text-center">
        Sign up with Foodies
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="flex justify-center flex-col">
            {formik.status && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded mb-3">
                {formik.status}
              </div>
            )}

            {/* Add missing firstName field */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-10 mb-3">
              <FormikTextField
                name="firstName"
                label="First Name"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />

              <FormikTextField
                name="lastName"
                label="Last Name"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />

              <FormikTextField
                name="username"
                label="User Name"
                className="col-span-2"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />

              <FormikTextField
                name="email"
                label="Email"
                className="col-span-2"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />

              <FormikTextField
                name="password"
                label="Password"
                type="password"
                className="col-span-2"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />

              <FormikTextField
                name="streetAddress"
                label="Street Address"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />

              <FormikTextField
                name="city"
                label="City"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />

              <FormikTextField
                name="state"
                label="State"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />

              <FormikTextField
                name="zipcode"
                label="Zipcode"
                sx={{ marginBottom: "16px" }}
                variant="standard"
              />
            </div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className="my-6"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              <strong>Submit</strong>
            </Button>
          </Form>
        )}
      </Formik>

      <div className="text-center text-xs mt-4">
        Already a user? {" "}
        <strong className="cursor-pointer">
          <Link href="/login">log into</Link>
        </strong>
        {" "}your account.
      </div>

    </div>
  );
}
