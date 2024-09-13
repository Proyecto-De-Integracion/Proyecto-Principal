import mongo from "mongoose";

const userModel = new mongo.Schema({
  usernames: {
    type: String,
    required: true,
    trim: true,
  },
  passwords: {
    type: String,
    required: true,
    trim: true,
  },
  emails: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const user = mongo.model("User", userModel);
