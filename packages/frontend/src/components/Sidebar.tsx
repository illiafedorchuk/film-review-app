/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  BiFilterAlt as BiFilterLeft,
  BiX,
  BiHome,
  BiBookmark as BiBookmarkFill,
  BiEnvelope,
  BiChat as BiChatLeftTextFill,
  BiArrowFromLeft,
  BiChevronRight,
  BiChevronLeft,
  BiMenu,
} from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import { IconBaseProps } from "react-icons";
const Sidebar = ({
  expanded = true,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      setExpanded(!expanded);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 640);
      if (screenWidth >= 640) {
        setIsSidebarVisible(false); // Ensures sidebar is closed on non-mobile screens
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <>
          <BiChevronRight
            className="text-4xl cursor-pointer fixed left-4 top-4"
            onClick={toggleSidebar}
          />
          {isSidebarVisible && (
            <div className="absolute top-0 bottom-0 left-0 w-[70%] duration-100 p-2 overflow-y-auto text-center bg-white shadow h-screen z-10">
              <SidebarContent
                expanded={expanded}
                toggleSidebar={toggleSidebar}
              />
            </div>
          )}
        </>
      ) : (
        <div
          className={`absolute top-0 bottom-0 left-0 duration-100 p-2 overflow-y-auto text-center bg-white shadow h-screen z-10 ${
            expanded ? "w-[200px]" : "w-[70px]"
          }`}
        >
          <SidebarContent expanded={!expanded} toggleSidebar={toggleSidebar} />
        </div>
      )}
    </div>
  );
};

const SidebarContent = ({
  expanded,
  toggleSidebar,
}: {
  expanded: boolean;
  toggleSidebar: () => void;
}) => (
  <>
    <div className="text-gray-100 text-xl">
      <div className="flex justify-between items-center p-2">
        {expanded ? (
          <BiChevronRight
            className="text-gray-800 text-4xl cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <BiChevronLeft
            className="text-gray-800 text-4xl cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
    <hr className="my-2 text-gray-300" />
    <SidebarItem icon={BiHome} label="Home" expanded={expanded} />
    <SidebarItem icon={BiBookmarkFill} label="Bookmark" expanded={expanded} />
    <SidebarItem icon={BiEnvelope} label="Messages" expanded={expanded} />
    <SidebarItem icon={BiArrowFromLeft} label="Logout" expanded={expanded} />
  </>
);

export default Sidebar;
