import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the interface for the context props
interface DarkModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context with a default undefined value
const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

// Provider component to manage dark mode state
export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize dark mode state based on localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("dark-mode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Effect to update localStorage and apply the dark mode class
  useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Toggle function to switch dark mode on and off
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use dark mode context
export const useDarkMode = (): DarkModeContextProps => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
