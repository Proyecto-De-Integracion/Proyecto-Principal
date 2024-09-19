import Router from "express";
import ctrl from "../controllers/user.controllers.js";
import validarJWT from "../middlewares/validarJwt.js";
const router = Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/session", validarJWT, ctrl.secureAccess);
export default router;
