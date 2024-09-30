import { Link } from "react-router-dom";
import foto1 from "../assets/img/calidad5.jpg";
import "./css/MainPages.css";

function MainPage() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Contenedor de la imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${foto1})` }}
      ></div>

      {/* Contenedor principal centrado */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-black bg-opacity-60 p-10 rounded-lg text-white w-full max-w-md text-center">
          <h1 className="text-5xl font-bold mb-4">
            Mira todos los eventos de hoy ...
          </h1>
          <p className="text-lg mb-8">
            Conéctate con lo que sucede a tu alrededor.
          </p>
          <div className="space-y-4">
            {/* Botón Crear cuenta */}
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200">
              Crear cuenta
            </button>
            {/* Botón Iniciar sesión */}
            <button className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
              <Link to="/login" className="block text-center w-full">
                Iniciar sesión
              </Link>
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Al registrarte, aceptas los Términos de servicio y la Política de
              privacidad, incluida la política de Uso de cookies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
