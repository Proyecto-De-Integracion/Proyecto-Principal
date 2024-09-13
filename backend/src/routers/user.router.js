import Router from "express";
import {
  login,
  register,
  secureAccess,
} from "../controllers/user.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";

const userRouter = Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/session", validatorJWT, secureAccess);
export default userRouter;
