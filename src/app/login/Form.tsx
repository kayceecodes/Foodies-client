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
import Button from "@mui/material/Button";
import FormikTextField from "./FormikTextField";
import { LockOutline, MailLockOutlined, MailOutlined } from "@mui/icons-material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Alert from "@mui/material/Alert";

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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/");
        return;
      }
      setStatus({ error: response.message || "Could not log in user" });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.log(message);
    } finally {
      if (!response?.success)
        // prevent state update after navigation
        setSubmitting(false);
    }
  };

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <AnimatePresence>
      <Formik
        initialValues={{ email: "Hiddle@gmail.com", password: "somepw" }} // loginCredentials would be used here
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <div className="bg-glass px-8 pt-8 pb-12 text-center rounded-lg border-stone-700 bg-neutral-800 border-[0.9px] w-96 container">
              <PermIdentityIcon sx={{fontSize: 55, marginBottom: "12px"}} />
            <h1 className="text-2xl font-bold text-neutral-300">
              Login to Foodies
            </h1>
            <div className="my-5 text-sm">Welcome back food lovers</div>
            <Form className="flex justify-center flex-col">
              {formik.status?.error && (
                <motion.div
                  key="status-errors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                <Alert className="mb-8" variant="outlined" severity="error">
                    {formik.status?.error}
                </Alert>
                </motion.div>
              )}
              <FormikTextField
                name="email"
                label="Email"
                startIcon={MailOutlined}
                sx={{ marginBottom: "32px" }}
                variant="outlined"
              />
              <FormikTextField
                name="password"
                label="Password"
                type="password"
                startIcon={LockOutline}
                sx={{ marginBottom: "32px" }}
                variant="outlined"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
              >
                <strong>Submit</strong>
              </Button>
            </Form>
            <small className="text-center inline-block mt-4">
              Don't have an account
              <Link className="font-semibold" href="/signup">
                {" "}sign up{" "}
              </Link>
              today.
            </small>
            <div className="text-center text-xs mt-4 font-semibold">
              <Link className="font-semibold" href="/reset-password">
                Forgot password?
              </Link>
            </div>
          </div>
        )}
      </Formik>
    </AnimatePresence>
  );
}
