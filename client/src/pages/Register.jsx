import { useState } from "react";
import { registerUser } from "../api/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import video from "../assets/video 1.mp4";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "El nombre de usuario es obligatorio";
    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido";
    }
    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const res = await registerUser({ username, email, password });
      if (res.message === "User created successfully") {
        Swal.fire({
          icon: "success",
          title: "Usuario creado con éxito",
          text: "Redirigiendo al login...",
          timer: 3000,
          timerProgressBar: true,
          willClose: () => {
            navigate("/login");
          },
        });
      } else {
        setErrors({ submit: res.message });
      }
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Contenedor dividido en dos columnas */}
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-3xl overflow-hidden">
        {/* Columna izquierda: Formulario */}
        <div className="w-1/2 p-10">
          <h1 className="text-5xl font-semibold">Registrarse</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            ¡Bienvenido! Por favor, ingresa tus detalles.
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium">Nombre de usuario</label>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearError("username");
                }}
                className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
                  errors.username ? "border-red-500" : "border-gray-100"
                }`}
                placeholder="Ingresa tu nombre de usuario"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Correo electrónico</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
                  errors.email ? "border-red-500" : "border-gray-100"
                }`}
                placeholder="Ingresa tu correo electrónico"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Contraseña</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
                className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
                  errors.password ? "border-red-500" : "border-gray-100"
                }`}
                placeholder="Ingresa tu contraseña"
                type="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            {errors.submit && (
              <p className="text-red-500 text-sm mt-4 text-center">
                {errors.submit}
              </p>
            )}
            <div className="mt-6 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>

        {/* Columna derecha: Video y título */}
        <div className="w-1/2 relative">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            src={video} // Cambiado aquí
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50">
            <h2 className="text-4xl text-white font-bold">ViewsEvent</h2>
            <p className="mt-4 text-white text-lg">
              ¿Ya tienes una cuenta?{" "}
              <button
                onClick={() => navigate("/login")}
                className="underline text-violet-300"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
