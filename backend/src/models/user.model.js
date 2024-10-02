import mongo from "mongoose";
import z from "zod";

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

const userModel = z.object({
  usernames: z.string().min(5, "The username must contain at least 5 characters").trim(),
  passwords: z.string().min(8, "Password is required").trim(),
  emails: z.string().min(11, "Email must be at least 11 characters long").email("Email is required is not valid").trim(),
  profilePicture: z
    .object({
      _id: z.string().default("imagenProyect/afpdiox30acmlfvcskww"),
      url: z.string().url("URL no válida").default("https://res.cloudinary.com/ddwriwzgm/image/upload/v1727374339/imagenProyect/afpdiox30acmlfvcskww.jpg"),
    })
    .optional(),
});
