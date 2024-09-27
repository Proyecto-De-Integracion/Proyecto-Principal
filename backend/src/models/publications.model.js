import mongo from "mongoose";
const publicationsModels = new mongo.Schema(
  {
    titles: { type: String, require: true, trim: true },
    idUsers: { type: String, require: true },
    descriptions: { type: String, require: true, trim: true },
    locations: { type: String, require: true },
    categorys: { type: String, require: true },
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
    startDates: { type: Date, require: true },
    endDates: { type: Date, require: true },
  },
  { timestamps: true }
);

export const publications = mongo.model("Publications", publicationsModels);
