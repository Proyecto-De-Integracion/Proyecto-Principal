import { deleteImage, deleteVideo } from "../helpers/cloudinary.js";
import { deleteImageOfdataBase } from "../utils/deleteImage.js";

export const deleteImageInCloudinary = async (req, res) => {
  const { id, idImage } = req.body;
  console.log(id, idImage);
  console.log(req.body);
  await deleteImageOfdataBase(id, idImage);
};

export const deleteVideoInCloudinary = async (req, res) => {
  try {
    const { id } = res.params.id;
    await deleteImage(id);
    res.status(200).json({
      message: "image removed successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
