import axios from "axios";
const API = "http://localhost:4000";


export const registerRequest = async (user) => {
  try {
    const response = await axios.post(`${API}/register`, user);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud de registro:", error);
    throw error.response
      ? error.response.data
      : new Error("Error al registrar");
  }
};


export const loginRequest = async (user) => {
  try {
    const response = await axios.post(`${API}/login`, user);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud de login:", error);
    throw error.response
      ? error.response.data
      : new Error("Error al iniciar sesión");
  }
};