import { Router } from "express";
import {
  deleteImageInCloudinary,
  deleteVideoInCloudinary,
} from "../controllers/media.controller.js";

const mediaRouter = Router();
mediaRouter.delete("/deleteImage", deleteImageInCloudinary);
mediaRouter.delete("/deleteVideo", deleteVideoInCloudinary);

export default mediaRouter;
