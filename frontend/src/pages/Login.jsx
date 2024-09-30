import { useState } from "react";
import { loginUser } from "../api/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import video from "../assets/video 1.mp4";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido";
    }
    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const res = await loginUser({ email, password });
      if (res.message === "Login successful") {
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Redirigiendo a la página principal...",
          timer: 3000, // 3 segundos
          timerProgressBar: true,
          willClose: () => {
            navigate("/home");
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
      <div className="w-full max-w-lg px-10 py-10 rounded-3xl bg-white border-2 border-gray-100">
        <h1 className="text-5xl font-semibold">Iniciar sesión</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          ¡Bienvenido de nuevo! Por favor, ingresa tus detalles.
        </p>
        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
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
            <div className="mt-6 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label
                  className="ml-2 font-medium text-base"
                  htmlFor="remember"
                >
                  Recordar por 30 días
                </label>
              </div>
              <button className="font-medium text-base text-violet-500">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Columna derecha: Video y título */}
      <div className="w-1/2 h-full relative">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          src={video}
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50">
          <h2 className="text-4xl text-white font-bold">ViewsEvent</h2>
          <p className="mt-4 text-white text-lg">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={() => navigate("/register")}
              className="underline text-violet-300"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
