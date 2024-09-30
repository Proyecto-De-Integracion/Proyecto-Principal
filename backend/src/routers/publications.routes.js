import { Router } from "express";
import {
  getPublications,
  createPublications,
  updatePublications,
  getPublicationsById,
} from "../controllers/publications.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";

const publicationsRoutes = Router();
publicationsRoutes.get("/publications", getPublications);
publicationsRoutes.get("/publications/:id", getPublicationsById);
publicationsRoutes.post("/publications", validatorJWT, createPublications);
publicationsRoutes.put("/publications/:id", validatorJWT, updatePublications);

export default publicationsRoutes;
