import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/user";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getProfile();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const redirectIfAuthenticated = (path) => {
    if (isAuthenticated) {
      navigate(path);
    }
  };

  return {
    isAuthenticated,
    redirectIfAuthenticated,
  };
};
