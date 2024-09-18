import { deleteImage, deleteVideo } from "../helpers/cloudinary.js";
import { publications } from "../models/publications.model.js";
import color from "chalk";
import mongoose from "mongoose";

export const deleteImageOfdataBase = async (publicationId, imageId) => {
  try {
    const objectId = mongoose.Types.ObjectId;
    const publication = await publications.findById(publicationId).exec();
    console.log(publication);

    if (publication) {
      throw new Error("Publicación no encontrada");
    }

    await publication.updateOne({
      $pull: { medias: { photos: { _id: imageId } } },
    });

    console.log("Imagen eliminada de la base de datos");

    // Manejar errores en deleteImage
    try {
      await deleteImage(imageId);
      console.log("Imagen eliminada del almacenamiento");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      // Manejar el error de forma adecuada, por ejemplo, registrarlo en un log
    }

    res.status(200).json({
      message: "Imagen eliminada exitosamente",
    });
  } catch (error) {
    console.error(error);
  }
};
