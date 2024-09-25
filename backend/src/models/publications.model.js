import mongo from "mongoose";
import fechaHoraActual from "../utils/generateDate.js";
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
    type: String,
    default: fechaHoraActual,
  },
  locations: {
    type: String,
    require: true,
  },
  categorys:{
    type:String,
    require:true
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
