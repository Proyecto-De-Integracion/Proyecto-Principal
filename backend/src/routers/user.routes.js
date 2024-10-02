import Router from "express";
import { login, logout, register, secureAccess } from "../controllers/user.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";
import { loginValidations, registerValidations } from "../validations/validation.js";
import { validator } from "../validator/validator.js";

const userRouter = Router();

userRouter.post("/register", registerValidations, validator, register);
userRouter.post("/login", loginValidations, validator, login);
userRouter.get("/session", validatorJWT, secureAccess);
userRouter.post("/logout", logout);
userRouter.put("/profileUpdater");

export default userRouter;
