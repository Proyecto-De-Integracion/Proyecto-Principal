import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      "Error al cerrar sesión", error;
    }
  };

  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Home;
