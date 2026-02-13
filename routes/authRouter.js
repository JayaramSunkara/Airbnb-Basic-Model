import express from "express";
import {
  getLogin,
  getSignup,
  postLogin,
  postLogout,
  postSignup,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postLogout);
authRouter.get("/signup", getSignup);
authRouter.post("/signup", postSignup);

export default authRouter;
