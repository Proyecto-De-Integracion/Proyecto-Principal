import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/User.Context";
import { useEffect } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegistroErrors } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    signup(data);
  });

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Registro</h1>
        {RegistroErrors.length > 0 && (
          <div className="bg-red-500 p-2 rounded-md mb-4">
            {RegistroErrors.map((error, i) => (
              <p key={i} className="text-white">
                {error}
              </p>
            ))}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-300 font-medium mb-2"
            >
              Nombre de Usuario
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Nombre es requerido" })}
              placeholder="Ingrese su nombre de usuario"
              className="w-full p-3 border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email es requerido" })}
              placeholder="Ingrese su correo electrónico"
              className="w-full p-3 border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
              placeholder="Ingrese su contraseña"
              className="w-full p-3 border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">¿Ya tienes una cuenta?</p>
          <Link to="/login">
            <button className="mt-2 text-blue-500 font-semibold hover:underline">
              Inicia sesión
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
