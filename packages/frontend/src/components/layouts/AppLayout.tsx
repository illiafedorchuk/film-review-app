/* eslint-disable @typescript-eslint/no-unused-vars */
// In AppLayout.tsx
import React, { ReactNode, useState } from "react";
import Sidebar from "../Sidebar"; // Ensure the import path is correct based on your project structure
import "../../lib/DarkMode.css"; // Import the CSS file with variables

interface AppLayoutProps {
  children: ReactNode;
  background?: string;
  maxWidth?: string;
  showNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="transition-all duration-500">
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
          <div className=" mx-auto relative">
            <Sidebar expanded={isOpen} setExpanded={setIsOpen}/>
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
