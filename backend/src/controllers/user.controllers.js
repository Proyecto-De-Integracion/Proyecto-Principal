import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateJWT from "../helpers/generateJWT.js";
import fs from 'fs';
import path from 'path';

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
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

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
      return res.json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};


export const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen" });
    }

    const profilePicturePath = path.join('uploads', req.file.filename);
    await User.updateOne({ _id: req.user.id }, { profilePicture: profilePicturePath });

    return res.status(200).json({ message: "Foto de perfil actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la foto de perfil:", error);
    return res.status(500).json({ message: "Error al actualizar la foto de perfil", error: error.message });
  }
};
