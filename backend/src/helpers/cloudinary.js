import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, API_SECRET, API_KEY } from "../config/config.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

export const uploadImage = async (filesPath) => {
  return await cloudinary.uploader.upload(filesPath, {
    folder: "imgenProyecyt",
  });
};

export const deleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

export async function uploadVideo(filePath) {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "upload",
    });
    console.log("Video subido correctamente:", uploadResult.secure_url);

    fs.unlinkSync(filePath);

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error al subir el video a Cloudinary:", error);
    throw error;
  }
}
