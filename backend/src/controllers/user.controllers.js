import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateJWT from "../helpers/generateJWT.js";
import fs from 'fs';
import path from 'path';

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      usernames: username,
      passwords: hashedPassword,
      emails: email,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("                                   error in user registration"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.error();
    console.error(error);
    console.error();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

// Función para iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userSearched = await User.findOne({ emails: email });
    if (!userSearched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, userSearched.passwords);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await generateJWT(userSearched._id);
    req.session.token = token;
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });
    const { usernames, profilePicture } = userSearched;
    return res.status(200).json({
      message: "Login successful",
      user: {
        usernames,
        profilePicture
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Unexpected Error", error });
  }
};

// Función para cerrar sesión
export const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Logout successful" });
    });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("                               An error occurred while closing the session"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.error();
    console.error(error);
    console.error();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "An error occurred while closing the session" });
  }
};

export const profileUpdater = async (req, res) => {
  try {
    const { id } = req.user;
    const { email, username } = req.body;
    if (req.files?.media) {
      const media = req.files.media;
      if (media.mimetype !== "image/jpeg" && media.mimetype !== "image/png") return res.status(400).json({ message: "el formato de imágenes es invalida" });
      const rout = media.tempFilePath;
      const result = await uploadImage(rout);
      const userUpdated = await user.findByIdAndUpdate(
        id,
        { $set: { emails: email, usernames: username, profilePicture: { _id: result.public_id, url: result.secure_url } } },
        { new: true }
      );
      if (!userUpdated) return res.status(404).json({ message: "no se pudo realizar la actualización de su usuario " });
      return res.status(200).json({ message: "perfil actualizado con éxito" });
    } else {
      const userUpdated = await user.findByIdAndUpdate(id, { $set: { emails: email, usernames: username } }, { new: true });
      if (!userUpdated) return res.status(404).json({ message: "no se pudo realizar la actualización de su usuario " });
      return res.status(200).json({ message: "perfil actualizado correctamente" });
    }
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("                                An error occurred while updating the user"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.error();
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

// Función para actualizar la foto de perfil
export const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen" });
    }
    const baseUrl = process.env.BASE_URL || 'http://localhost:4000';

    const profilePicturePath = `${baseUrl}/uploads/${req.file.filename}`;

    await User.updateOne({ _id: req.user.id }, { profilePicture: profilePicturePath });

    return res.status(200).json({ message: "Foto de perfil actualizada con éxito", profilePicture: profilePicturePath });
  } catch (error) {
    console.error("Error al actualizar la foto de perfil:", error);
    return res.status(500).json({ message: "Error al actualizar la foto de perfil", error: error.message });
  }
};


// Función para obtener la sesión del usuario
export const getSession = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No se ha iniciado sesión" });
  }

  const { usernames, profilePicture } = req.user;
  return res.json({
    user: {
      usernames,
      profilePicture
    }
  });
};

