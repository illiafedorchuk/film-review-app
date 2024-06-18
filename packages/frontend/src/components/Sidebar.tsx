/* eslint-disable @typescript-eslint/no-unused-vars */
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
  BiSearch,
} from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import { useDarkMode } from "./layouts/DarkModeContext";
import MovieSearch from "./MainPageComponents/MovieSearch";

const Sidebar = ({
  expanded = false,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarVisible((prevVisible) => !prevVisible);
    } else {
      setExpanded((prevExpanded) => !prevExpanded);
      setIsSearchActive(false); // Reset search active state when manually toggling sidebar
    }
  }, [isMobile, setExpanded]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsSidebarVisible(false);
        if (!isMobile && expanded) {
          setExpanded(false);
          setIsSearchActive(false);
        }
      }
    },
    [isMobile, expanded, setExpanded]
  );

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

  const handleSearchClick = () => {
    if (!expanded) {
      setExpanded(true);
    }
    setIsSearchActive(true);
  };

  return (
    <div className="fixed z-50 top-0 left-0" id="sidebar">
      {isMobile ? (
        <>
          {!isSidebarVisible && (
            <div className="fixed left-4 top-4 z-50 p-2 rounded-full cursor-pointer bg-purple-600">
              <BiChevronRight
                className="text-4xl text-white"
                onClick={toggleSidebar}
              />
            </div>
          )}
          {isSidebarVisible && (
            <div
              id="mobile-sidebar"
              className="fixed top-0 bottom-0 left-0 w-[70%] max-w-[300px] p-4 overflow-y-auto text-center shadow-lg h-full z-50 rounded-r-3xl bg-[var(--input-bg-color)]"
            >
              <SidebarContent
                expanded={true}
                toggleSidebar={toggleSidebar}
                isSearchActive={isSearchActive}
                handleSearchClick={handleSearchClick}
              />
            </div>
          )}
        </>
      ) : (
        <div
          className={`fixed top-0 bottom-0 left-0 duration-500 p-4 overflow-y-auto text-center h-screen z-50 rounded-r-3xl shadow-lg bg-[var(--input-bg-color)] ${
            expanded ? "w-[240px]" : "w-[80px]"
          }`}
        >
          <SidebarContent
            expanded={expanded}
            toggleSidebar={toggleSidebar}
            isSearchActive={isSearchActive}
            handleSearchClick={handleSearchClick}
          />
        </div>
      )}
    </div>
  );
};

const SidebarContent = React.memo(
  ({
    expanded,
    toggleSidebar,
    isSearchActive,
    handleSearchClick,
  }: {
    expanded: boolean;
    toggleSidebar: () => void;
    isSearchActive: boolean;
    handleSearchClick: () => void;
  }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const user = {
      avatarUrl: "https://via.placeholder.com/48",
      nickname: "Username",
      uniqueCode: "#12345",
    };

    const handleCodeClick = () => {
      navigator.clipboard.writeText(user.uniqueCode);
    };

    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-2 text-[var(--text-color)]">
          {expanded ? (
            <BiChevronLeft
              className="text-[var(--text-color)] text-4xl cursor-pointer"
              onClick={toggleSidebar}
            />
          ) : (
            <BiChevronRight
              className="text-4xl cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex flex-col flex-1">
          <div className="py-5">
            <div className="flex mb-4">
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              {expanded && (
                <div className="flex flex-col ml-2">
                  <span className="font-bold">{user.nickname}</span>
                  <span
                    className="text-sm text-left text-gray-500 cursor-pointer"
                    onClick={handleCodeClick}
                  >
                    {user.uniqueCode}
                  </span>
                </div>
              )}
            </div>
            {expanded ? (
              <MovieSearch
                apiKey={`25827bdb07a5e10047fca31922e36d9e`}
                onMovieSelect={function (): void {
                  throw new Error("Function not implemented.");
                }}
                isActive={isSearchActive}
              />
            ) : (
              <SidebarItem
                icon={BiSearch}
                label={""}
                expanded={false}
                onClick={handleSearchClick}
              />
            )}
            <nav className="flex-1">
              <SidebarItem icon={BiHome} expanded={expanded} label={"Home"} />
              <SidebarItem
                icon={BiBookmarkFill}
                expanded={expanded}
                label={"Bookmark"}
              />
              <SidebarItem
                icon={BiEnvelope}
                expanded={expanded}
                label={"Messages"}
              />
            </nav>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-auto">
            {isDarkMode ? (
              <SidebarItem
                icon={BiSun}
                expanded={expanded}
                label={"Dark mode"}
                onClick={toggleDarkMode}
              />
            ) : (
              <SidebarItem
                icon={BiMoon}
                expanded={expanded}
                label={"Light mode"}
                onClick={toggleDarkMode}
              />
            )}
          </div>
          <SidebarItem
            icon={BiArrowFromLeft}
            expanded={expanded}
            label={"Exit"}
          />
        </div>
      </div>
    );
  }
);

export default Sidebar;
