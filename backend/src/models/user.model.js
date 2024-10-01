import mongo from "mongoose";

const userModel = new mongo.Schema({
  usernames: { type: String, required: true, trim: true },
  passwords: { type: String, required: true, trim: true },
  emails: { type: String, required: true, trim: true },
  profilePicture: {
    _id: { type: String, default: "imagenProyect/afpdiox30acmlfvcskww" },
    url: {
      type: String,
      default: "https://res.cloudinary.com/ddwriwzgm/image/upload/v1727374339/imagenProyect/afpdiox30acmlfvcskww.jpg",
    },
  },
});

export const user = mongo.model("User", userModel);
