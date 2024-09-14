import { Router } from "express";
import {
  getPublications,
  createPublications,
} from "../controllers/publications.controllers.js";

const publicationsRoutes = Router();
publicationsRoutes.get("/publications", getPublications);
publicationsRoutes.post("/publications", createPublications);

export default publicationsRoutes;
