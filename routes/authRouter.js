import express from "express";
import { getLogin, getLogout, postLogin } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.get("logout", getLogout);

export default authRouter;
