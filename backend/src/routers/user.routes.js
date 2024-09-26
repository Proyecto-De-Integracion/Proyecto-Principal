import Router from "express";
import {
  login,
  logout,
  register,
  secureAccess,
  updateProfilePicture,
} from "../controllers/user.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";
import uploadProfilePicture from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/session", validatorJWT, secureAccess);
userRouter.post("/logout", logout);
userRouter.post("/profile-picture", validatorJWT, uploadProfilePicture, updateProfilePicture);

export default userRouter;
