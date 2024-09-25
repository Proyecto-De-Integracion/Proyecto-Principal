import {
  deleteImageOfdataBase,
  deleteVideoOfdataBase,
  fileInsert,
  fileInsertion,
} from "../utils/media.utils.js";
import { validatorId } from "../middlewares/validatorId.js";
import { publications } from "../models/publications.model.js";

export const deleteImageInCloudinary = async (req, res) => {
  try {
    const { id } = req.params;
    const { idImage } = req.body;
    const { message } = await deleteImageOfdataBase(id, idImage);
    res.json({
      message: message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideoInCloudinary = async (req, res) => {
  try {
    const { id } = req.params;
    const { idVideo } = req.body;
    const { message } = await deleteVideoOfdataBase(id, idVideo);
    res.json({
      message: message,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const updateMedias = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!req.files?.media) {
//       const { valor } = validatorId(id);
//       if (!valor) {
//         return res.status(404).json({ message: "Invalid id" });
//       }
//       const publication = await publications.findById(id);

//     } else {
//       const media = req.files.media;
//       const isValid = Array.isArray(media);
//       const { valor } = validatorId(id);
//       if (!valor) {
//         res.status(404).json({
//           message: "Invalid id",
//         });
//       }
//       const publication = await publications.findById(id);
//       if (!isValid) {
//         const rout = media.tempFilePath;
//         const type = media.mimetype;
//         if (type === "image/png" || type === "image/jpeg") {
//           const { dato } = await fileInsert(type, rout);
//           publication.medias.photos.push(...dato);
//           await publication.save();
//         } else if (type === "video/mp4") {
//           const { dato } = await fileInsert(type, rout);
//           publication.medias.videos.push(...dato);
//           await publication.save();
//         }
//         res.status(200).json({
//           message: "Media updated",
//         });
//       } else {
//         const type = media.map((Element) => {
//           return Element.mimetype;
//         });
//         const rout = media.map((Element) => {
//           return Element.tempFilePath;
//         });
//         const { photos, videos } = await fileInsertion(media, type, rout);
//         publication.medias.photos.push(...photos);
//         publication.medias.videos.push(...videos);
//         await publication.save();
//         res.status(200).json({
//           message: "Media updated",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
