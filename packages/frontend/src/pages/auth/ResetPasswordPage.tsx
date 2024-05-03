/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams } from "react-router-dom"; // Import useParams

import InputError from "../../components/InputErrors";
import axios from "../../lib/axios";
import PasswordField from "../../components/PasswordField";

const schema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFields = z.infer<typeof schema>;

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordFields>({
    resolver: zodResolver(schema),
  });

  // Extract the token from URL
  const { signResetPasswordToken } = useParams<{
    signResetPasswordToken: string;
  }>();

  const onSubmit: SubmitHandler<ResetPasswordFields> = async (data) => {
    try {
      const response = await axios.patch(
        `/auth/resetPassword/${signResetPasswordToken}`, // Use the extracted token in the URL
        data
      );
      console.log(response.data);
      alert("Reset successful!");
      reset();
    } catch (error: any) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center min-h-screen bg-gray-100 ">
      <div className="flex flex-col justify-center items-center w-full px-4 py-10 lg:w-1/2 ">
        <div className="w-4/5 max-w-lg px-10 py-20 bg-white rounded-3xl border-2 border-gray-100 ">
          <h1 className="text-4xl font-semibold mb-5">
            Please enter your new password.
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <PasswordField
              name="password"
              label="Password"
              error={errors.password}
              placeholder="Password"
              register={register}
              type={""}
            />
            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPassword}
              placeholder="Confirm password"
              register={register}
              type={""}
            />
            <button
              type="submit"
              className="bg-violet-500 rounded-xl text-white font-bold text-md w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform h-12"
              disabled={isSubmitting}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
