import { useEffect, useState } from "react";
import { getSession } from "../api/auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await getSession();
      setIsAuthenticated(!!res.user);
    };
    checkAuth();
  }, []);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
