import { Router } from "express";
import {
  getPublications,
  createPublications,
} from "../controllers/publications.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";

const publicationsRoutes = Router();
publicationsRoutes.get("/publications", getPublications);
publicationsRoutes.post("/publications", validatorJWT, createPublications);

export default publicationsRoutes;
