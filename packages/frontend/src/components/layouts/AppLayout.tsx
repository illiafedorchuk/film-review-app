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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="transition-all duration-300">
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
          <div className=" mx-auto relative">
            <Sidebar expanded={isOpen} setExpanded={setIsOpen} />
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
