/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../../lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputError from "../../components/InputErrors";
import AppLayout from "../../components/layouts/AppLayout";
import TextInput from "../../components/TextInput";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AppLayout>
      <div className="flex flex-wrap justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center w-full px-4 py-10 lg:w-1/2">
          <div className="w-full max-w-lg px-10 py-20 bg-white rounded-3xl border-2 border-gray-100">
            <h1 className="text-4xl font-semibold">Login</h1>
            <p className="font-medium text-md text-gray-500 mt-4">
              Please enter your details.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <TextInput
                label="Email"
                placeholder="Enter your email"
                type="text"
                register={register}
                name="email"
                error={errors.email}
              />
              <div className="flex flex-col mt-4">
                <label className="text-md font-medium">Password</label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-12 border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-700 "
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </div>
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="mt-4 py-2 bg-violet-500 rounded-xl text-white font-bold text-md w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform h-12"
              >
                {isSubmitting ? "Loading..." : "Login"}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-2 bg-red-100 text-red-500 rounded-lg flex justify-center items-center">
                <InputError messages={error} />
              </div>
            )}
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-violet-500 hover:text-violet-600 transition duration-300 ease-in-out"
              >
                Sign up
              </Link>
            </p>
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

export default LoginForm;
