import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../lib/AuthContext"; // Import your AuthContext

export const useRedirectIfAuthenticated = (shouldBeAuthenticated: boolean) => {
  const authContext = useContext(AuthContext); // Replace with context to get the auth state
  const isAuthenticated = authContext?.isAuthenticated ?? false;
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (isAuthenticated && !shouldBeAuthenticated) {
      navigate("/", { replace: true }); // Redirect to home if logged in and should not be on login/register
    } else if (shouldBeAuthenticated && !isAuthenticated) {
      navigate("/signin", { replace: true }); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, shouldBeAuthenticated, navigate]);

  return isAuthenticated;
};
