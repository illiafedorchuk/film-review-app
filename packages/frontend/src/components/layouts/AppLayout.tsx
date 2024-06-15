/* eslint-disable @typescript-eslint/no-unused-vars */
// In AppLayout.tsx
import React, { ReactNode, useState } from "react";
import Sidebar from "../Sidebar"; // Ensure the import path is correct based on your project structure
import { DarkModeProvider, useDarkMode } from "../layouts/DarkModeContext"; // Import DarkModeContext
import "../../lib/DarkMode.css"; // Import the CSS file with variables

interface AppLayoutProps {
  children: ReactNode;
  background?: string;
  maxWidth?: string;
  showNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  background = "white",
  showNav = true,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to control the sidebar
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use dark mode context

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="transition-all duration-300">
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
          <div className=" mx-auto relative">
            <Sidebar expanded={isOpen} setExpanded={setIsOpen} />
            <header className="flex justify-end">
              <button
                onClick={toggleDarkMode}
                className="px-4 py-2 bg-[var(--button-bg-color)] text-[var(--button-text-color)] rounded  fixed"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </header>
            <main className="transition-all hover:duration-300 z-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
