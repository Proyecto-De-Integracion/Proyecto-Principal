import { useEffect, useState } from "react";
import { getSession, logoutUser } from "../api/auth"; // Asegúrate de importar logoutUser
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSession();
      if (res.user) {
        setUser(res.user);
      } else {
        navigate("/login");
      }
    };
    fetchSession();
  }, [navigate]);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.message === "Logout successful") {
      Swal.fire({
        title: "Cierre de sesión",
        text: "Redirigiendo a la página de inicio de sesión...",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      Swal.fire("Error", "No se pudo cerrar sesión", "error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl">Welcome, {user?.usernames}</h2>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;
