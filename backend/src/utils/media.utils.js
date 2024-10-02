import { deleteImage, deleteVideo } from "../helpers/cloudinary.js";
import { publications } from "../models/publications.model.js";
import mongoose from "mongoose";

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
    const idValid = mongoose.Types.ObjectId.isValid(pId);

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
