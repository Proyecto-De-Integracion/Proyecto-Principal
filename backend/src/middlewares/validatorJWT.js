import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { user } from "../models/user.model.js";
import color from "chalk";

export default async (req, res, next) => {
  try {
    console.log("");
    console.log("");
    console.log("--------------------Session-------------------");
    console.log(req.session);
    console.log("----------------------------------------------");
    console.log("");
    console.log("");
    console.log("--------------------cookies-------------------");
    console.log(req.cookies);
    console.log("----------------------------------------------");
    console.log("");
    console.log("");

    const token = req.cookies.authToken || req.session.token;
    if (!token) {
      res.status(403).json({ message: "Token no proporcionado" });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const userSearched = await user.findById(decoded.id);
    if (!userSearched) {
      res.status(401).json({ message: "Token Inválido" });
    }
    req.user = userSearched;
    next();
  } catch (error) {
    console.log(" ");

    console.log("---------------------Error---------------------");
    console.log(color.red("Error al verificar el token"));
    console.log("-----------------------------------------------");
    console.log(color.yellow("El Usuario no tiene un Token "));
    console.log("-----------------------------------------------");
  }
};
