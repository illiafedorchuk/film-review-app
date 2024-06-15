/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextInput from "./AuthComponents/TextInput";
import axios from "../lib/axios";

const emailSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormFields = {
  email: string;
};

const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormFields>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormFields) => {
    try {
      const response = await axios.post("/auth/forgotPassword", data);
      alert("Password reset link sent to your email!");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="flex w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded">
        <div className="mb-10">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            type="text"
            register={register}
            name="email"
            error={errors.email}
          />
        </div>
        <button
          type="submit"
          className="bg-violet-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Reset Password
        </button>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className=" text-violet-600 hover:text-violet-700 flex"
            onClick={onClose}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordModal;
