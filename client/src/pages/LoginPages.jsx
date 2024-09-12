import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/User.Context";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: SignInErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        {SignInErrors.length > 0 && (
          <div className="bg-red-500 p-2 rounded-md mb-4">
            {SignInErrors.map((error, i) => (
              <p key={i} className="text-white">
                {error}
              </p>
            ))}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Campo de Correo Electrónico */}
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

          {/* Campo de Contraseña */}
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

          {/* Botón de Iniciar Sesión */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Link a Registro */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">¿No tienes una cuenta?</p>
          <Link to="/register">
            <button className="mt-2 text-blue-500 font-semibold hover:underline">
              Regístrate
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
