/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import { User } from "../types/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// Export the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user data...");
        const response = await axios.get("http://localhost:3000/user/me", {
          withCredentials: true, // Include cookies in the request
        });
        setUser(response.data);
        console.log("User fetched:", response.data);
      } catch (error: any) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Use an empty dependency array to run only once on component mount

  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("User logged in:", userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {}, // An empty object for the request body
        { withCredentials: true } // Ensure cookies are sent
      );
      setUser(null);
      localStorage.removeItem("user");
      console.log("User logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
