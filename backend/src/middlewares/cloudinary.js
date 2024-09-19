import { v2 as cloudinary } from "cloudinary";
import { secret } from "../config/config.js";

cloudinary.config({
  cloud_name: secret.cloud_name,
  api_key: secret.api_key,
  api_secret: secret.api_secret,
  secure: true,
});

export const uploadImage = async (filePaht) => {
  return await cloudinary.uploader.upload(filePaht, {
    folder: "AlmacenDeImagen",
  });
};

export const deleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};
