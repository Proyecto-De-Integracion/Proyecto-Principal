import {
  deleteImageOfdataBase,
  deleteVideoOfdataBase,
} from "../utils/deleteImage.js";

export const deleteImageInCloudinary = async (req, res) => {
  try {
    const { id, idImage } = req.body;
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
    const { id, idVideo } = req.body;
    const { message } = await deleteVideoOfdataBase(id, idVideo);
    res.json({
      message: message,
    });
  } catch (error) {
    console.log(error);
  }
};
