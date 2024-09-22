import { Router } from "express";
import {
  deleteImageInCloudinary,
  deleteVideoInCloudinary,
  updateMedias,
} from "../controllers/media.controller.js";

const mediaRouter = Router();
mediaRouter.delete("/deleteImage/:id", deleteImageInCloudinary);
mediaRouter.delete("/deleteVideo/:id", deleteVideoInCloudinary);
mediaRouter.put("/insertMedias/:id", updateMedias);

export default mediaRouter;
