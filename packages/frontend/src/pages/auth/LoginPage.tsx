/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import InputError from "../../components/InputErrors";
import AppLayout from "../../components/layouts/AppLayout";
import TextInput from "../../components/TextInput";
import axios from "../../lib/axios";
import ForgotPasswordModal from "../../components/ForgotPassword";
import PasswordField from "../../components/PasswordField";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const emailSchema = z.object({
  email: z.string().email(),
});

type LoginPageFields = z.infer<typeof schema>;
type ForgotPasswordFormFields = z.infer<typeof emailSchema>;

const LoginPage = () => {
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginPageFields>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginPageFields> = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);
      console.log(response.data);
      alert("Login successful!");
      reset(); // Reset the form after successful login
      setError(null); // Clear any previous errors
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const toggleForgotPasswordModal = () => {
    setForgotPasswordModalOpen(!forgotPasswordModalOpen);
  };

  return (
    <AppLayout>
      <div className="flex flex-wrap justify-center min-h-screen bg-gray-100 ">
        <div className="flex flex-col justify-center items-center w-full px-4 py-10 lg:w-1/2 ">
          <div className="w-4/5 max-w-lg px-10 py-20 bg-white rounded-3xl border-2 border-gray-100 ">
            <h1 className="text-4xl font-semibold">
              {forgotPasswordModalOpen ? "Forgot password?" : "Login"}
            </h1>
            <p className="font-medium text-md text-gray-500 mt-4">
              {forgotPasswordModalOpen
                ? "Please enter your email."
                : "Please enter your details."}
            </p>
            {forgotPasswordModalOpen ? (
              <ForgotPasswordModal onClose={toggleForgotPasswordModal} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  type="text"
                  register={register}
                  name="email"
                  error={errors.email}
                />
                <div className="flex flex-col mt-4">
                  <PasswordField
                    name="password"
                    label="Password"
                    error={errors.password}
                    placeholder={"Password"}
                    type={""}
                    register={register}
                  />
                </div>
                <div className="flex flex-wrap justify-end">
                  <Link
                    to="#"
                    onClick={() => setForgotPasswordModalOpen(true)}
                    className="text-violet-500 hover:text-violet-600"
                  >
                    Forgot password?
                  </Link>
                  {/* More existing UI code */}
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="mt-4 py-2 bg-violet-500 rounded-xl text-white font-bold text-md w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform h-12"
                >
                  {isSubmitting ? "Loading..." : "Login"}
                </button>
              </form>
            )}
            {error && (
              <div className="mt-4 p-2 bg-red-100 text-red-500 rounded-lg flex justify-center items-center">
                <InputError messages={error} />
              </div>
            )}
            {forgotPasswordModalOpen ? (
              " "
            ) : (
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-violet-500 hover:text-violet-600 transition duration-300 ease-in-out"
                >
                  Sign up
                </Link>
              </p>
            )}
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 bg-violet-500 justify-center items-center rounded-s-full text-white">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
            <p className="text-lg">
              Enter your personal details to use all of site features
            </p>
            <button className="mt-4 py-3 px-6 bg-white text-violet-500 rounded-xl font-semibold hover:bg-gray-200 transition duration-300 ease-in-out">
              <Link
                to="/signup"
                className="text-violet-500 hover:text-violet-600 transition duration-300 ease-in-out"
              >
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
