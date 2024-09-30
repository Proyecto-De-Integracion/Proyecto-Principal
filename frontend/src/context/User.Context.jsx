// src/context/User.Context.jsx
import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/user.js";
export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      setErrors(
        error.response ? error.response.data : ["Error en el registro"]
      );
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      setErrors(
        error.response ? error.response.data : ["Error al iniciar sesión"]
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
