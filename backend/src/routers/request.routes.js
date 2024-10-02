import Router from "express";
import { creatorRequest } from "../controllers/req.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";
const reqRouter = Router();

reqRouter.post("/req", validatorJWT, creatorRequest);
export default reqRouter;
