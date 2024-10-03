import { Router } from "express";
import {
  publicationGetter,
  postCreator,
  postFinderById,
  postUpdater,
  postRemover,
  categoryPostGetter,
  publicationGetterByTitle,
} from "../controllers/publications.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";
import { publicationsValidations } from "../validations/validation.js";
import { validator } from "../validator/validator.js";

const publicationsRoutes = Router();
publicationsRoutes.get("/publications", publicationGetter);
publicationsRoutes.get("/publications/:id", postFinderById);
<<<<<<< HEAD
publicationsRoutes.post("/publications", publicationsValidations, validator, validatorJWT, postCreator);
publicationsRoutes.put("/publications/:id", publicationsValidations, validator, validatorJWT, postUpdater);
=======
publicationsRoutes.post("/publications", validatorJWT, postCreator);
publicationsRoutes.put("/publications/:id", validatorJWT, postUpdater);
>>>>>>> 71be1ab2f6d4a2f8e3503b16dd36d3cb5b4d039d
publicationsRoutes.delete("/publications/:id", postRemover);
publicationsRoutes.get(
  "/publications/searched/for/category/:category",
  categoryPostGetter
);
publicationsRoutes.get(
  "/publications/searched/for/title/:title",
  publicationGetterByTitle
);

export default publicationsRoutes;
