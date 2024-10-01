import { Router } from "express";
import { getPublications, createPublications, postUpdater, postRemover, categoryPostGetter, publicationGetterByTitle } from "../controllers/publications.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";

const publicationsRoutes = Router();
publicationsRoutes.get("/publications", getPublications);
publicationsRoutes.post("/publications", validatorJWT, createPublications);
publicationsRoutes.put("/publications/:id", validatorJWT, postUpdater);
publicationsRoutes.delete("/publications/:id", postRemover);
publicationsRoutes.get("/publications/searched/for/category/:category", categoryPostGetter);
publicationsRoutes.get("/publications/searched/for/title/:title", publicationGetterByTitle);

export default publicationsRoutes;
