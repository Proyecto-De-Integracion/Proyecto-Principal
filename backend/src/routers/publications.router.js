import { Router } from "express";
import fileUpload from "express-fileupload";
import {
  getPublications,
  createPublications,
} from "../controllers/publications.controller.js";
const routerPublic = Router();
routerPublic.get("/Publications", getPublications);
routerPublic.post(
  "/Publications",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createPublications
);

export default routerPublic;
