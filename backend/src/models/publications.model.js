import mongo from "mongoose";
const publicationsModels = new mongo.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  _idUser: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: String,
    require: true,
  },
  media: {
    photos: [
      {
        id: String,
        url: String,
      },
    ],
    videos: [
      {
        id: String,
        url: String,
      },
    ],
  },
});

export const publications = mongo.model("Publications", publicationsModels);
