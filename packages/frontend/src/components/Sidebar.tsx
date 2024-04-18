/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUserAlt, FaTools } from "react-icons/fa";

// Ensure to receive the props for controlling state
const Sidebar = ({
  isOpen,
  setIsOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}) => {
  const iconStyle = "text-purple-500 text-xl"; // Style for icons

  return (
    <div
      className={`fixed top-0 left-0 h-full z-30 ${
        isOpen ? "w-256px" : "w-16"
      } transition-width duration-300 ease-in-out bg-white shadow-lg`}
    >
      <div className="p-5 text-right">
        <button onClick={toggleSidebar} className="text-xl">
          {isOpen ? (
            <FaTimes className={iconStyle} />
          ) : (
            <FaBars className={iconStyle} />
          )}
        </button>
      </div>
      <ul className="mt-10">
        <li className="p-4 hover:bg-purple-100">
          <Link to="/" className="flex items-center justify-start">
            <FaHome className={iconStyle} />
            {isOpen && <span className="ml-4">Home</span>}
          </Link>
        </li>
        <li className="p-4 hover:bg-purple-100">
          <Link to="/about" className="flex items-center justify-start">
            <FaUserAlt className={iconStyle} />
            {isOpen && <span className="ml-4">About</span>}
          </Link>
        </li>
        <li className="p-4 hover:bg-purple-100">
          <Link to="/services" className="flex items-center justify-start">
            <FaTools className={iconStyle} />
            {isOpen && <span className="ml-4">Services</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
