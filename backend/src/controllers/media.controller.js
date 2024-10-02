import { deleteImageOfdataBase, deleteVideoOfdataBase } from "../utils/media.utils.js";

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
