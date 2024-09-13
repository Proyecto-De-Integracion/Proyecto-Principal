import { Router } from "express";
import { getPublications } from "../controllers/publications.controllers.js";
import fileUpload from "express-fileupload";

const publicationsRoutes = Router();
publicationsRoutes.get("/publications", getPublications);
publicationsRoutes.post(
  "/publications",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "../uploads",
  }),
  getPublications
);

export default publicationsRoutes;
