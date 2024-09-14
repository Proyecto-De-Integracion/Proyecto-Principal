function multimediaFormat(array, scheme) {
  array.forEach(async (element) => {
    if (element.mimetype == "image/png") {
      const result = await uploadImage(element.tempFilePath);
      console.log(result);

      scheme.medias.photos.push({
        url: result.secure_url,
        _id: result.public_id,
      });
      console.log(newPublications.medias.photos);
    }
  });

  array.forEach(async (element) => {
    if (element.mimetype == "video/mp4") {
      const result = await uploadVideo(element.tempFilePath);
      console.log(result);

      scheme.medias.videos.push({
        url: result.secure_url,
        _id: result.public_id,
      });
      console.log(newPublications.medias.videos);
    }
  });
}
