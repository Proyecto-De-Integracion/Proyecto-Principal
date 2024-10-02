import request from "../models/req.model.js";
import color from "chalk";

export const creatorRequest = async (req, res) => {
  try {
    const { description } = req.body;
    const { emails, usernames } = req.user;

    console.log(emails);
    console.log(usernames);
    console.log(description);
    const newRequest = new request({
      user: usernames,
      email: emails,
      descriptions: description,
    });
    const status = await newRequest.save();
    const isSave = Boolean(status);
    if (isSave) res.status(404).json({ message: "no se puedo hacer el envió de la petición " });
    res.status(200).json({ message: "petición enviada cone éxitos" });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("Error al enviar uan petición al servidor "));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(404).json({ message: "No se pudo hacer la petición por favor intente mas tarde " });
  }
};
