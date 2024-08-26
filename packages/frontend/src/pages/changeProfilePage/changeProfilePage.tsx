/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { countryOptions } from "./countries";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import { editUserProfile } from "../../lib/api";

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

const ChangeProfilePage = ({
  token,
  initialProfile,
}: {
  token: string;
  initialProfile: any;
}) => {
  const [avatarFileName, setAvatarFileName] = useState<string>("");
  const [username, setUsername] = useState(initialProfile?.name || "");
  const [aboutMe, setAboutMe] = useState(initialProfile?.aboutMe || "");
  const [location, setLocation] = useState<SingleValue<CountryOption>>(
    countryOptions.find(
      (option) => option.label === initialProfile?.country
    ) || {
      value: "",
      label: "None",
      flag: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFileName(event.target.files[0].name); // Save the file name only
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Create an object to store fields that should be updated
    const updatedFields: any = {};

    // Validation for username
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      setLoading(false);
      return;
    }

    // Only add fields to the update if they are not empty and different from the initial value
    if (avatarFileName) updatedFields.avatarUrl = avatarFileName;
    if (username.trim() && username !== initialProfile?.name)
      updatedFields.name = username;
    if (aboutMe.trim() && aboutMe !== initialProfile?.aboutMe)
      updatedFields.aboutMe = aboutMe;
    if (location?.label && location?.label !== initialProfile?.country)
      updatedFields.country = location?.label;

    // If there are no fields to update, stop the submission
    if (Object.keys(updatedFields).length === 0) {
      setError("No changes detected.");
      setLoading(false);
      return;
    }

    try {
      await editUserProfile(
        token,
        updatedFields.avatarUrl || initialProfile?.avatarUrl, // Use the current avatar if no new file is selected
        updatedFields.name || initialProfile?.name, // Use the current name if not changed
        updatedFields.aboutMe || initialProfile?.aboutMe, // Use the current aboutMe if not changed
        updatedFields.country || initialProfile?.country // Use the current country if not changed
      );
      setSuccess("Profile updated successfully!");
    } catch (apiError) {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const customSelectStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "var(--input-bg-color)",
      color: "var(--text-color)",
      border: "1px solid var(--input-border-color)",
      boxShadow: "none",
    }),
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: "var(--input-bg-color)",
      border: "1px solid var(--input-border-color)",
      margin: 0,
      boxShadow: "none",
    }),
    menuList: (styles: any) => ({
      ...styles,
      padding: 0,
      backgroundColor: "var(--input-bg-color)",
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      padding: "8px 10px",
      margin: 0,
      backgroundColor: isSelected
        ? "var(--button-bg-color)"
        : isFocused
        ? "var(--input-bg-hover-color)"
        : "var(--input-bg-color)",
      color: "var(--text-color)",
      cursor: "pointer",
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: "var(--text-color)",
    }),
  };

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="max-w-3xl mx-auto bg-[var(--input-bg-color)] shadow-md rounded-lg p-8 px-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
          {loading && (
            <p className="text-center text-gray-600">Updating profile...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {success && <p className="text-center text-green-500">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6 text-center">
              <label className="block mt-4">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 rounded-md border border-gray-600 focus:ring-2 focus:ring-violet-500"
                  onChange={handleAvatarChange}
                />
              </label>
              {avatarFileName && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected file: {avatarFileName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="username" className="block font-bold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="aboutMe" className="block font-bold mb-2">
                About Me
              </label>
              <textarea
                id="aboutMe"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500"
                style={{ height: "100px" }}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="location" className="block font-bold mb-2">
                Location
              </label>
              <Select
                id="location"
                options={countryOptions}
                value={location}
                onChange={setLocation}
                formatOptionLabel={(country: CountryOption) => (
                  <div className="flex items-center">
                    <span className={`fi fi-${country.flag} mr-2`} />
                    {country.label}
                  </div>
                )}
                styles={customSelectStyles}
                classNamePrefix="select"
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-violet-500 text-white rounded-lg font-semibold hover:bg-violet-600 transition duration-300"
              disabled={loading}
            >
              Save Changes
            </button>
          </form>
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
};

export default ChangeProfilePage;
