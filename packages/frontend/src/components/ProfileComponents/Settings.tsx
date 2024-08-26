import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../lib/api"; // Import your API
import PasswordChangeForm from "./passwordChangeForm";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [showPasswordForm, setShowPasswordForm] = useState(false); // State to toggle password form visibility
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const redirectToEdit = () => {
    navigate(`/profile/me/editProfile`);
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm); // Toggle the visibility of the password change form
  };

  const handlePasswordChange = async (
    oldPassword: string,
    newPassword: string
  ) => {
    setLoading(true);
    try {
      await changePassword(oldPassword, newPassword);
      setSuccess("Password updated successfully!");
      setShowPasswordForm(false); // Hide the form after success
    } catch (error) {
      setError("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--input-bg-color)] p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="mt-4">
        <p
          className="text-gray-600 cursor-pointer underline"
          onClick={redirectToEdit}
        >
          Update your profile information
        </p>
        <p
          className="text-gray-600 cursor-pointer underline"
          onClick={togglePasswordForm} // Toggle the password form visibility
        >
          {showPasswordForm ? "Hide Password Form" : "Change Password"}
        </p>

        {success && <p className="text-green-500 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {showPasswordForm && (
        <div className="mt-6">
          <PasswordChangeForm
            onSubmit={handlePasswordChange}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default Settings;
