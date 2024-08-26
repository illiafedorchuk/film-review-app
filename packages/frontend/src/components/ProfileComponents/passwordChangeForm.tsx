/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PasswordField from "../AuthComponents/PasswordField"; // Import the custom PasswordField component

interface PasswordChangeFormProps {
  onSubmit: (oldPassword: string, newPassword: string) => void;
  loading: boolean;
}

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  onSubmit,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PasswordFormValues>();
  const [formError, setFormError] = useState<string | null>(null);

  const newPassword = watch("newPassword");

  const handleFormSubmit: SubmitHandler<PasswordFormValues> = (data) => {
    setFormError(null);

    if (data.newPassword.length < 8) {
      setFormError("New password must be at least 8 characters long.");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setFormError("New password and confirm password do not match.");
      return;
    }

    // Call the onSubmit handler passed from the parent
    onSubmit(data.oldPassword, data.newPassword);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {formError && <p className="text-red-500 mb-4">{formError}</p>}

      <PasswordField
        label="Old Password"
        placeholder="Enter your old password"
        name="oldPassword"
        register={register}
        error={errors.oldPassword}
        type="password"
      />

      <PasswordField
        label="New Password"
        placeholder="Enter your new password"
        name="newPassword"
        register={register}
        error={errors.newPassword}
        type="password"
      />

      <PasswordField
        label="Confirm New Password"
        placeholder="Confirm your new password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
        type="password"
      />

      <button
        type="submit"
        className={`w-full py-3 mt-4 bg-violet-500 text-white rounded-lg font-semibold hover:bg-violet-600 transition duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
};

export default PasswordChangeForm;
