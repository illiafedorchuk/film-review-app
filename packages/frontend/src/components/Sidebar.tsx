import React, { useState, useEffect, useCallback } from "react";
import {
  BiHome,
  BiBookmark as BiBookmarkFill,
  BiEnvelope,
  BiArrowFromLeft,
  BiChevronRight,
  BiChevronLeft,
  BiMoon,
  BiSun,
} from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import { useDarkMode } from "./layouts/DarkModeContext";

const Sidebar = ({
  expanded = false,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarVisible((prevVisible) => !prevVisible);
    } else {
      setExpanded((prevExpanded) => !prevExpanded);
    }
  }, [isMobile, setExpanded]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const sidebar = document.getElementById("mobile-sidebar");
    if (sidebar && !sidebar.contains(event.target as Node)) {
      setIsSidebarVisible(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 640);
      if (screenWidth >= 640) {
        setIsSidebarVisible(false); // Ensures sidebar is closed on non-mobile screens
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="fixed z-50 top-0 left-0">
      {isMobile ? (
        <>
          {!isSidebarVisible && (
            <div className="fixed left-4 top-4 z-50 p-2 rounded-full cursor-pointer bg-violet-600">
              <BiChevronRight
                className="text-4xl text-white"
                onClick={toggleSidebar}
              />
            </div>
          )}
          {isSidebarVisible && (
            <div
              id="mobile-sidebar"
              className="fixed top-4 bottom-4 left-6 w-[70%] max-w-[300px] p-4 overflow-y-auto text-center shadow-lg h-[90%] z-50 rounded-3xl sidebar bg-[var(--input-bg-color)]"
            >
              <SidebarContent expanded={true} toggleSidebar={toggleSidebar} />
            </div>
          )}
        </>
      ) : (
        <div
          className={`fixed top-0 bottom-0 left-0 duration-500 p-2 overflow-y-auto text-center h-screen z-50 rounded-r-3xl shadow-lg sidebar  bg-[var(--input-bg-color)] ${
            expanded ? "w-[200px]" : "w-[70px]"
          }`}
        >
          <SidebarContent expanded={expanded} toggleSidebar={toggleSidebar} />
        </div>
      )}
    </div>
  );
};

const SidebarContent = React.memo(
  ({
    expanded,
    toggleSidebar,
  }: {
    expanded: boolean;
    toggleSidebar: () => void;
  }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
      <>
        <div className="text-[var(--sidebar-text-color)] text-xl">
          <div className="flex justify-between items-center p-2">
            {expanded ? (
              <BiChevronLeft
                className="text-[var(--sidebar-text-color)] text-4xl cursor-pointer"
                onClick={toggleSidebar}
              />
            ) : (
              <BiChevronRight
                className="text-[var(--sidebar-text-color)] text-4xl cursor-pointer"
                onClick={toggleSidebar}
              />
            )}
          </div>
        </div>
        <hr className="my-2 text-[var(--border-color)]" />
        <a href="http://localhost:5173/"><SidebarItem icon={BiHome} expanded={expanded} label={"Home"} /></a>

        <SidebarItem
          icon={BiBookmarkFill}
          expanded={expanded}
          label={"Bookmark"}
        />
        <SidebarItem icon={BiEnvelope} expanded={expanded} label={"Messages"} />
        <SidebarItem
          icon={BiArrowFromLeft}
          expanded={expanded}
          label={"Exit"}
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-10 h-10 rounded-full text-[var(--sidebar-text-color)] "
          >
            {isDarkMode ? (
              <BiSun className="text-xl" />
            ) : (
              <BiMoon className="text-xl" />
            )}
          </button>
        </div>
      </>
    );
  }
);

export default Sidebar;
