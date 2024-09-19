import { sql } from "../config/config.js";
import { dataBase } from "../db/dataBase.js";
import { uploadImage } from "../middlewares/cloudinary.js";

export const getPublications = async (req, res) => {
  try {
    const conexion = await dataBase();
    const [publications] = await conexion.query(sql.getPublicatins);
    res.status(200).json(publications);
  } catch (error) {
    console.log(error);
  }
};

export const createPublications = async (req, res) => {
  try {
    const { title, descriptions, types, id_Users } = await req.body;
    const { media } = req.files;
    console.log(media);
    console.log(req.files);
    console.log(title);
    console.log(types);
    console.log(descriptions);
    console.log(id_Users);
  } catch (error) {
    console.log(error);
  }
};
