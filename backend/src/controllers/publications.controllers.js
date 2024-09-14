import { publications } from "../models/publications.model.js";
import color from "chalk";
import { uploadImage, uploadVideo } from "../helpers/cloudinary.js";

export const getPublications = (req, res) => {};

export const createPublications = async (req, res) => {
  try {
    const { title, idUser, description, location } = req.body;
    if (req.files?.media) {
      const mediaFiles = req.files.media;
      const identifier = Array.isArray(mediaFiles);
      if (identifier) {
        const newPublications = new publications({
          titles: title,
          idUser: idUser,
          descriptions: description,
          locations: location,});
          mediaFiles.forEach((element) => {
            if (element.mimetype === "image/png") {
              console.log("imagen", element);
            } else if (element.mimetype === "video/mp4") {
              console.log("video", element);
            }
          }),
      } else {
      }
    } else {
      const newPublications = new publications({
        titles: title,
        idUsers: idUser,
        descriptions: description,
        locations: location,
      });
      await newPublications.save();
      return res.json({ message: "Post created successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
