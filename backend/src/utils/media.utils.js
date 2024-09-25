import {
  deleteImage,
  deleteVideo,
  uploadImage,
  uploadVideo,
} from "../helpers/cloudinary.js";
import { publications } from "../models/publications.model.js";
import mongoose from "mongoose";
import fs from "fs-extra";
import { deletesFiles } from "./deletePath.js";
const objectId = mongoose.Types.ObjectId;

export const deleteImageOfdataBase = async (pId, imageId) => {
  try {
    const idValid = objectId.isValid(pId);

    if (idValid) {
      const publication = await publications.findById(pId).exec();

      if (!publication) return { message: "the post does not exist" };

      const result = await publication.updateOne({
        $pull: { "medias.photos": { _id: imageId } },
      });
      if (result.acknowledged === true && result.modifiedCount === 1) {
        await deleteImage(imageId);

        return { message: "image deleted successfully" };
      } else if (result.acknowledged === true && result.modifiedCount === 0) {
        return { message: "the image has already been deleted" };
      } else {
        return { message: "error deleting image" };
      }
    } else {
      return { message: "The id entered is not valid" };
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteVideoOfdataBase = async (pId, videoId) => {
  try {
    const idValid = objectId.isValid(pId);

    if (idValid) {
      const publication = await publications.findById(pId).exec();

      if (!publication) return { message: "the post does not exist" };

      const result = await publication.updateOne({
        $pull: { "medias.videos": { _id: videoId } },
      });
      if (result.acknowledged === true && result.modifiedCount === 1) {
        await deleteVideo(videoId);
        return { message: "video deleted successfully" };
      } else if (result.acknowledged === true && result.modifiedCount === 0) {
        return { message: "the video has already been deleted" };
      } else {
        return { message: "error deleting video" };
      }
    } else {
      return { message: "The id entered is not valid" };
    }
  } catch (error) {
    console.error(error);
  }
};

export const fileInsertion = async (files, typeFile, routFiles) => {
  const photos = [];
  const videos = [];
  for (let i = 0; i < files.length; i++) {
    if (typeFile[i] === "image/png" || typeFile[i] === "image/jpeg") {
      const result = await uploadImage(routFiles[i]);
      photos.push({
        _id: result.public_id,
        url: result.secure_url,
      });
    } else if (typeFile[i] === "video/mp4") {
      const result = await uploadVideo(routFiles[i]);
      videos.push({
        _id: result.public_id,
        url: result.secure_url,
      });
    }
  }
  await deletesFiles(routFiles);
  return { photos, videos };
};

export const fileInsert = async (type, rout) => {
  try {
    const dato = [];
    if (type === "video/mp4") {
      const result = await uploadVideo(rout);
      dato.push({
        _id: result.public_id,
        url: result.secure_url,
      });
    } else if (type === "image/png" || type === "image/jpeg") {
      const result = await uploadImage(rout);
      dato.push({
        _id: result.public_id,
        url: result.secure_url,
      });
    }
    await fs.unlink(rout);
    return { dato };
  } catch (error) {
    console.log(error);
  }
};
