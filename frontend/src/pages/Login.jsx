import { useEffect } from "react"; // Importa useEffect desde react
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user";
import "../css/login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, redirectIfAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    redirectIfAuthenticated("/home");
  }, [isAuthenticated, redirectIfAuthenticated]);

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      Swal.fire("Inicio de sesión exitoso", "Bienvenido de nuevo.", "success");
      navigate("/home");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      Swal.fire("Error", "Error en el inicio de sesión", "error");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2 className="title">Iniciar sesión</h2>
        <div className="mb-4">
          <label htmlFor="email" className="label">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Correo electrónico es requerido",
            })}
            className={`input ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Contraseña es requerida" })}
            className={`input ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
