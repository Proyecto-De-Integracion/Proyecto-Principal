import mongo from "mongoose";
const publicationsModels = new mongo.Schema({
  titles: {
    type: String,
    require: true,
    trim: true,
  },
  idUsers: {
    type: String,
    require: true,
  },
  descriptions: {
    type: String,
    require: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  locations: {
    type: String,
    require: true,
  },
  medias: {
    photos: [
      {
        _id: String,
        url: String,
      },
    ],
    videos: [
      {
        _id: String,
        url: String,
      },
    ],
  },
});

export const publications = mongo.model("Publications", publicationsModels);
