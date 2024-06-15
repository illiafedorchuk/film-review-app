/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";
import { useState } from "react";

function PasswordField({
  label,
  placeholder,
  type,
  register,
  name,
  error,
}: {
  label: string;
  placeholder: string;
  type: string;
  register: any;
  name: string;
  error: any;
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col mt-4">
      <label htmlFor={name} className="text-md font-medium">
        {label}
      </label>
      <div className="relative w-full">
        <div
          className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 "
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaEyeSlash className="w-5 h-5" />
          ) : (
            <FaEye className="w-5 h-5" />
          )}
        </div>
        <input
          {...register(name)}
          placeholder={placeholder}
          id={name}
          type={showPassword ? "text" : "password"}
          className="w-full h-12 border-2 border-[var(--border-color)] rounded-xl p-4 mt-1 bg-transparent max-sm:border-gray-200"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
}

export default PasswordField;
