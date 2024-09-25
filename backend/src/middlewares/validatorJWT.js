import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { user } from "../models/user.model.js";
import color from "chalk";

export default async (req, res, next) => {
  try {
    console.log("\n\n--------------------Session-------------------");
    console.log(req.session);
    console.log("----------------------------------------------\n\n");
    console.log("--------------------Cookies-------------------");
    console.log(req.cookies);
    console.log("----------------------------------------------\n\n");
    const token = req.cookies.authToken || req.session.token;
    if (!token) {
      return res.status(403).json({ message: "You do not have the authorization" });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const userSearched = await user.findById(decoded.id);
    if (!userSearched) {
      return res.status(401).json({ message: "Your authorization has already expired" });
    }
    req.user = userSearched;
    next();
  } catch (error) {
    console.error("---------------------Error---------------------");
    console.error(color.red("Error al verificar el token"));
    console.error(error);
    console.error("-----------------------------------------------");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
