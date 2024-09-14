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
          locations: location,
        });
        mediaFiles.forEach(async (element) => {
          if (element.mimetype == "image/png") {
            const result = await uploadImage(element.tempFilePath);
            console.log(result);

            newPublications.medias.photos.push({
              url: result.secure_url,
              _id: result.public_id,
            });
            console.log(newPublications.medias.photos);
          }
        });

        mediaFiles.forEach(async (element) => {
          if (element.mimetype == "video/mp4") {
            const result = await uploadVideo(element.tempFilePath);
            console.log(result);

            newPublications.medias.videos.push({
              url: result.secure_url,
              _id: result.public_id,
            });
            console.log(newPublications.medias.videos);
          }
        });

        res.status(200).json({ message: "Post created successfully" });
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
