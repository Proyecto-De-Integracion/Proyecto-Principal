import mongoose from "mongoose";

const userModel = new mongoose.Schema({
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
  profilePicture: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userModel);
export default User;
