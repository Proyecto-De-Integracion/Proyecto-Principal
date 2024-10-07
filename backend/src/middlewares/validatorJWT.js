import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { user } from "../models/user.model.js";
import color from "chalk";

export default async (req, res, next) => {
  try {
    const token = req.cookies.authToken || req.session.token;

    if (!token) return res.status(403).json({ message: "You do not have the authorization" });

    const decoded = jwt.verify(token, SECRET_KEY);
    const userSearched = await user.findById(decoded.id);
    if (!userSearched) {
      return res.status(401).json({ message: "Your authorization has already expired" });
    }

    req.user = userSearched;
    next();
  } catch (error) {
    console.error(color.red("Error al verificar el token"));
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
