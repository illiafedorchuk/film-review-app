import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="bg-[var(--input-bg-color)] p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="mt-4">
        <p className="text-gray-600">Update your profile information</p>
        <p className="text-gray-600">Change password</p>
      </div>
    </div>
  );
};

export default Settings;
