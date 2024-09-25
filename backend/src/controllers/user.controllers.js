import bcrypt from "bcrypt";
import { user } from "../models/user.model.js";
import color from "chalk";
import generateJWT from "../helpers/generateJWT.js";

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      usernames: username,
      passwords: hashedPassword,
      emails: email,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por correo electrónico
    const userSearched = await user.findOne({ emails: email });
    if (!userSearched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, userSearched.passwords);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generar el token JWT
    const token = await generateJWT(userSearched._id);

    // Almacenar el token en la sesión
    req.session.token = token;

    // Configurar la cookie con el token JWT
    res.cookie("authToken", token, {
      httpOnly: true,  // Solo accesible desde HTTP, no por JavaScript
      secure: process.env.NODE_ENV === 'production',  // Solo HTTPS en producción
      maxAge: 3600000,  // Tiempo de expiración: 1 hora
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',  // Configuración para solicitudes CORS
    });

    // Responder con éxito
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Unexpected Error", error });
  }
};

export const secureAccess = (req, res) => {
  try {
    if (!req.user) {
      res.json({ message: "user did not log in" });
    } else {
      res.json({
        message: "Access allowed to protected area",
        user: req.user,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};
