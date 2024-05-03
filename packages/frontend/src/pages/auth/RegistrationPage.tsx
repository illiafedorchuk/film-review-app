/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import AppLayout from "../../components/layouts/AppLayout";
import TextInput from "../../components/TextInput";
import axios from "../../lib/axios";
import { useState } from "react";
import InputError from "../../components/InputErrors";
import PasswordField from "../../components/PasswordField";

const schema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
      alert("Signup successful!");
      reset(); // Reset the form after successful signup
      setError(null); // Clear any previous errors
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-wrap justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center w-full px-4 lg:w-1/2">
          <div className="max-sm:w-full sm:w-4/5 max-w-lg px-10 py-5 sm:bg-white rounded-3xl border-2 border-gray-100 max-sm:bg-gray-100">
            <h1 className="text-4xl font-semibold">Register</h1>
            <p className="font-medium text-md text-gray-500 mt-4">
              Create your account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextInput
                label="Name"
                placeholder="Enter your name"
                type="text"
                register={register}
                name="name"
                error={errors.name}
              />
              <TextInput
                label="Email"
                placeholder="Enter your email"
                type="text"
                register={register}
                name="email"
                error={errors.email}
              />
              <PasswordField
                name="password"
                label="Password"
                error={errors.password}
                placeholder="Password"
                type=""
                register={register}
              />
              <PasswordField
                name="confirmPassword"
                label="Confirm your password"
                error={errors.confirmPassword}
                placeholder="Password"
                type="password"
                register={register}
              />
              <button
                disabled={isSubmitting}
                type="submit"
                className="mt-4 py-2 bg-violet-500 rounded-xl text-white font-bold text-md w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform h-12"
              >
                {isSubmitting ? "Loading..." : "Register"}
              </button>
              {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-500 rounded-lg flex justify-center items-center">
                  <InputError messages={error} />
                </div>
              )}
            </form>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-violet-500 hover:text-violet-600 transition duration-300 ease-in-out"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 bg-violet-500 justify-center items-center rounded-s-full text-white">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Welcome!</h2>
            <p className="text-lg">
              Already have an account? Sign in to continue.
            </p>
            <Link
              to="/signin"
              className="text-violet-500 hover:text-violet-600 transition duration-300 ease-in-out"
            >
              <button className="mt-4 py-3 px-6 bg-white text-violet-500 rounded-xl font-semibold hover:bg-gray-200 transition duration-300 ease-in-out">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RegisterPage;
