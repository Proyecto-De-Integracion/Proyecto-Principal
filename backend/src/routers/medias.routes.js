import { Router } from "express";
import { deleteImageInCloudinary } from "../controllers/media.controller.js";

const mediaRouter = Router();
mediaRouter.delete("/deleteImage", deleteImageInCloudinary);
mediaRouter.delete("/");

export default mediaRouter;
