/* eslint-disable @typescript-eslint/no-unused-vars */
// In AppLayout.tsx
import React, { ReactNode, useState } from "react";
import Sidebar from "../Sidebar"; // Ensure the import path is correct based on your project structure

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
      <div
        style={{ background: "#F3F4F6", maxWidth: "100%", margin: "0 auto" }}
      >
        <div
          style={{ maxWidth: "1920px", margin: "0 auto", position: "relative" }}
        >
          <Sidebar expanded={isOpen} setExpanded={setIsOpen} />
          <main className={`transition-all`}>{children}</main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
