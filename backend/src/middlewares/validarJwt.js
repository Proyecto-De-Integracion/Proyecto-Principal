import JWT from "jsonwebtoken";
import { dataBase } from "../db/database.js";
import { My_Secret_Key, sql } from "../config/config.js";
export default async (req, res, next) => {
  try {
    const token = req.cookies.authToken || req.session.token;

    if (!token) {
      return res.status(403).json({
        messaje: "Token no proporcionado ",
      });
    }
    const decoded = JWT.verify(token, My_Secret_Key);
    const connection = await dataBase();
    const [user] = await connection.query(sql.loginToken, [decoded.id]);
    if (!user) res.status(401).json({ messaje: "Token invalido" });

    req.user = user[0];

    next();
  } catch (error) {
    console.log(error);
  }
};
