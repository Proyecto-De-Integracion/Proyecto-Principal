import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/user";

const Register = () => {
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
      await registerUser(data);
      Swal.fire("Registro exitoso", "El usuario ha sido creado.", "success");
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
      Swal.fire("Error", "Error en el registro", "error");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2 className="title">Registro</h2>
        <div className="mb-4">
          <label htmlFor="username" className="label">
            Nombre de usuario
          </label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Nombre de usuario es requerido",
            })}
            className={`input ${errors.username ? "input-error" : ""}`}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="label">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Correo electrónico es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo electrónico no es válido",
              },
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
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
