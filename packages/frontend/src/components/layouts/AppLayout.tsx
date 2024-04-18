/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useState } from "react";
import Sidebar from "../Sidebar";

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

  // This will toggle the sidebar state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {showNav && (
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          setIsOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      <div style={{ background, maxWidth: "100%", margin: "0 auto" }}>
        <div style={{ maxWidth: "1920px", margin: "0 auto" }}>{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
