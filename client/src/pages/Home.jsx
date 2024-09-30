import { useEffect, useState } from "react";
import { getSession, logoutUser, updateProfilePicture } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSession();
      if (res.user) {
        setUser(res.user);
        if (res.user.profilePicture) {
          setProfilePicture(res.user.profilePicture);
        }
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

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: imageUrl,
      }));
    }
  };

  const handleProfilePictureUpload = async () => {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      const res = await updateProfilePicture(formData);
      if (res.message) {
        Swal.fire("Éxito", "La foto de perfil se ha actualizado", "success");

        // Actualizar el estado del usuario con la nueva URL de la imagen
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: res.profilePicture, // Se usa la URL devuelta por el servidor
        }));
      } else {
        throw new Error("No se pudo actualizar la foto de perfil");
      }
    } catch (error) {
      console.error("Error en la carga de la foto de perfil:", error);
      Swal.fire(
        "Error",
        error.message || "No se pudo actualizar la foto de perfil",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl">Welcome, {user?.usernames}</h2>

      {/* Mostrar la imagen de perfil si está disponible */}
      {user?.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full mt-4"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
        className="mt-4 border border-gray-300 p-2 rounded"
      />

      <button
        onClick={handleProfilePictureUpload}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        disabled={!profilePicture}
      >
        Cambiar Foto de Perfil
      </button>

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
