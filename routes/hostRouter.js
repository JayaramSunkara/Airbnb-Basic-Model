import express from "express";
const hostRouter = express.Router();

import {
  getHomes,
  getAddHome,
  getEditHome,
  postAddHome,
  postEditHome,
  deleteHome,
} from "../controllers/hostController.js";

hostRouter.get("/host-home-list", getHomes);
hostRouter.get("/add-home", getAddHome);
hostRouter.get("/edit-home/:homeId", getEditHome);

hostRouter.post("/add-home", postAddHome);
hostRouter.post("/edit-home", postEditHome);
hostRouter.post("/delete-home/:homeId", deleteHome);

export default hostRouter;
