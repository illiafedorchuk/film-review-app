/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import { FaEye } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
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
  BiLogIn,
} from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import { useDarkMode } from "./layouts/DarkModeContext";
import MovieSearch from "./MainPageComponents/MovieSearch";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/AuthContext"; // Use the custom hook from AuthContext

const Sidebar = ({
  expanded = false,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route location

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarVisible((prevVisible) => !prevVisible);
    } else {
      setExpanded((prevExpanded) => !prevExpanded);
      setIsSearchActive(false);
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
        setIsSidebarVisible(false);
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

  const handleMovieSelect = (movie: any) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  // Determine if a menu item is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed z-50 top-0 left-0" id="sidebar">
      {isMobile ? (
        <>
          {!isSidebarVisible && (
            <div className="fixed left-4 top-4 z-50 p-2 rounded-full cursor-pointer bg-purple-600">
              <BiChevronRight className="text-4xl" onClick={toggleSidebar} />
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
                onMovieSelect={handleMovieSelect}
                user={user}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
              />
            </div>
          )}
        </>
      ) : (
        <div
          className={`fixed top-0 bottom-0 left-0 p-4 overflow-y-auto text-center h-screen z-50 rounded-r-3xl shadow-lg bg-[var(--input-bg-color)]  duration-500 transition-width ${
            expanded ? "w-[240px]" : "w-[80px]"
          }`}
        >
          <SidebarContent
            expanded={expanded}
            toggleSidebar={toggleSidebar}
            isSearchActive={isSearchActive}
            handleSearchClick={handleSearchClick}
            onMovieSelect={handleMovieSelect}
            user={user}
            handleLogout={handleLogout}
            handleLogin={handleLogin}
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
    onMovieSelect,
    user,
    handleLogout,
    handleLogin,
  }: {
    expanded: boolean;
    toggleSidebar: () => void;
    isSearchActive: boolean;
    handleSearchClick: () => void;
    onMovieSelect: (movie: any) => void;
    user: any;
    handleLogout: () => void;
    handleLogin: () => void;
  }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const handleBookmarkNavigate = () => {
      navigate(`/profile/me/favouriteMovies`);
    };

    const handleWatchlistNavigate = () => {
      navigate(`/profile/me/watchlist`);
    };

    const handleReviewsNavigate = () => {
      navigate(`/profile/me/ratedMovies`);
    };

    const handleProfileNavigate = () => {
      navigate(`/profile/me`);
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
            <div
              className={`flex mb-4 cursor-pointer duration-300 hover:text-white p-2 rounded-md ${
                expanded ? "hover:bg-violet-500" : ""
              }`}
              onClick={handleProfileNavigate}
            >
              {user ? (
                <>
                  <img
                    src={user.avatarUrl}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {expanded && (
                    <div className="flex flex-col ml-2">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-sm text-left cursor-pointer hover:text-white">
                        {user.id}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-violet-500 p-1 text-white font-bold rounded-sm">
                  {expanded ? "Login to see your profile" : "Hello!"}
                </div>
              )}
            </div>
            {expanded ? (
              <MovieSearch
                apiKey={`25827bdb07a5e10047fca31922e36d9e`}
                onMovieSelect={onMovieSelect}
                isActive={isSearchActive}
              />
            ) : (
              <SidebarItem
                icon={BiSearch}
                label={""}
                expanded={false}
                onClick={handleSearchClick}
                active={isActive("/search")} // Check if the current route is "/search"
              />
            )}
            <nav className="flex-1">
              <SidebarItem
                icon={BiHome}
                expanded={expanded}
                label={"Home"}
                onClick={() => navigate("/")}
                active={isActive("/")}
              />
              <SidebarItem
                icon={MdOutlineReviews}
                expanded={expanded}
                label={"Reviews"}
                onClick={handleReviewsNavigate}
                active={isActive("/profile/me/ratedMovies")}
              />
              <SidebarItem
                icon={BiBookmarkFill}
                expanded={expanded}
                label={"Bookmark"}
                onClick={handleBookmarkNavigate}
                active={isActive("/profile/me/favouriteMovies")}
              />
              <SidebarItem
                icon={BiEnvelope}
                expanded={expanded}
                label={"Messages"}
                onClick={handleBookmarkNavigate}
                active={isActive("/profile/me/messages")}
              />
              <SidebarItem
                icon={FaEye}
                expanded={expanded}
                label={"Watchlist"}
                onClick={handleWatchlistNavigate}
                active={isActive("/profile/me/watchlist")}
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
          {user ? (
            <SidebarItem
              icon={BiArrowFromLeft}
              expanded={expanded}
              label={"Logout"}
              onClick={handleLogout}
            />
          ) : (
            <SidebarItem
              icon={BiLogIn}
              expanded={expanded}
              label={"Login"}
              onClick={handleLogin}
            />
          )}
        </div>
      </div>
    );
  }
);

export default Sidebar;
