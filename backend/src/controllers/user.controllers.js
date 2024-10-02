import bcrypt from "bcrypt";
import { user } from "../models/user.model.js";
import color from "chalk"; // Assuming the model is named User.js
import generateJWT from "../helpers/generateJWT.js";
import { uploadImage } from "../helpers/cloudinary.js";
import { isProduction } from "../index.js";
import fs from "fs";

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userSearched = await user.findOne({ emails: email });

    if (!userSearched) res.status(401).json({ message: "Invalid email or password" });
    const isValidPassword = await bcrypt.compare(password, userSearched.passwords);

    if (!isValidPassword) res.status(401).json({ message: "Invalid email or password" });

    const token = await generateJWT(userSearched._id);

    req.session.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction,
      SameSite: isProduction ? "None" : "Lax",
      maxAge: 3600000,
      sameSite: 'None',
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("                                        User login error"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.error();
    console.error(error);
    console.error();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "login error" });
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
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("                                        User session error"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.error();
    console.error(error);
    console.error();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "session error" });
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

// export const profileUpdater = async (req, res) => {
//   try {
//     const { id } = req.user;
//     const { email, username } = req.body;
//     if (req.files?.media) {
//       const media = req.files.media;
//       if (media.mimetype !== "image/jpeg" && media.mimetype !== "image/png") return res.status(400).json({ message: "el formato de imágenes es invalida" });
//       const rout = media.tempFilePath;
//       const result = await uploadImage(rout);
//       const userUpdated = await user.findByIdAndUpdate(id, { $set: { emails: email, usernames: username, profilePicture: { _id: result.public_id, url: result.secure_url } } }, { new: true });
//       if (!userUpdated) return res.status(404).json({ message: "no se pudo realizar la actualización de su usuario " });
//       return res.status(200).json({ message: "perfil actualizado con éxito" });
//     } else {
//       const userUpdated = await user.findByIdAndUpdate(id, { $set: { emails: email, usernames: username } }, { new: true });
//       if (!userUpdated) return res.status(404).json({ message: "no se pudo realizar la actualización de su usuario " });
//       return res.status(200).json({ message: "perfil actualizado correctamente" });
//     }
//   } catch (error) {
//     console.log(color.blue("----------------------------------------------------------------------------------------------------"));
//     console.log(color.red("                                An error occurred while updating the user"));
//     console.log(color.blue("----------------------------------------------------------------------------------------------------"));
//     console.error();
//     console.error(error);
//     console.error();
//     console.log(color.blue("----------------------------------------------------------------------------------------------------"));
//     res.status(500).json({ message: "An error occurred while updating the user" });
//   }
// };

export const profileUpdater = async (req, res) => {
  try {
    const { id } = req.user;
    const { email, username } = req.body;

    if (req.files?.media) {
      const media = req.files.media;
      if (media.mimetype !== "image/jpeg" && media.mimetype !== "image/png") {
        return res.status(400).json({ message: "el formato de imágenes es invalida" });
      }

      // Aquí podrías usar fs para manejar el archivo temporal, si es necesario
      const rout = media.tempFilePath; // Por ejemplo, usar fs para mover o eliminar el archivo

      const result = await uploadImage(rout); // Supongamos que esta función está bien definida
      const userUpdated = await user.findByIdAndUpdate(id, { $set: { emails: email, usernames: username, profilePicture: { _id: result.public_id, url: result.secure_url } } }, { new: true });

      if (!userUpdated) {
        return res.status(404).json({ message: "no se pudo realizar la actualización de su usuario " });
      }
      return res.status(200).json({ message: "perfil actualizado con éxito" });
    } else {
      const userUpdated = await user.findByIdAndUpdate(id, { $set: { emails: email, usernames: username } }, { new: true });
      if (!userUpdated) {
        return res.status(404).json({ message: "no se pudo realizar la actualización de su usuario " });
      }
      return res.status(200).json({ message: "perfil actualizado correctamente" });
    }
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("                                An error occurred while updating the user"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.error();
    console.error(error);
    console.error();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "An error occurred while updating the user" });
  }
};
