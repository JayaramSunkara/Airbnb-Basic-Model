import express from "express";
import {
  getBookings,
  getFavorites,
  getHomeDetails,
  getHomePage,
  getHomesList,
  postAddFavorites,
  postDeleteFavorites,
} from "../controllers/storeController.js";
const storeRouter = express.Router();

storeRouter.get("/", getHomePage);
storeRouter.get("/homes", getHomesList);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favourites", getFavorites);
storeRouter.get("/homes/:homeId", getHomeDetails);

storeRouter.post("/favourites", postAddFavorites);
storeRouter.post("/favourites/delete/:homeId", postDeleteFavorites);

export default storeRouter;
