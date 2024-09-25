import { uploadImage, uploadVideo } from "../helpers/cloudinary.js";

export const multimediaFormat = async (arrai0, arrai1, arrai2) => {
  const photo = [];
  const video = [];
  for (let i = 0; i < arrai0.length; i++) {
    if (arrai1[i] === "video/mp4") {
      try {
        const resultVideo = await uploadVideo(arrai2[i]);
        video.push({
          _id: resultVideo.public_id,
          url: resultVideo.secure_url,
        });
      } catch (error) {
        console.error("Error al subir video:", error);
      }
    }

    if (arrai1[i] === "image/png" || arrai1[i] === "image/jpeg") {
      try {
        const resultImage = await uploadImage(arrai2[i]);
        photo.push({
          _id: resultImage.public_id,
          url: resultImage.secure_url,
        });
      } catch (error) {
        console.error("Error al subir imagen: ", error);
      }
    }
  }
  return { photo, video };
};

export const singlMediaFormat = async (file) => {
  const video = [];
  const photo = [];
  if (file.mimetype === "video/mp4") {
    console.log("video");
    console.log(file.tempFilePath);
    const resultVideo = await uploadVideo(file.tempFilePath);
    video.push({
      _id: resultVideo.public_id,
      url: resultVideo.secure_url,
    });
  } else if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    console.log("Image");
    console.log(file.tempFilePath);
    const resultImage = await uploadImage(file.tempFilePath);
    photo.push({
      _id: resultImage.public_id,
      url: resultImage.secure_url,
    });
  }
  return { video, photo };
};
