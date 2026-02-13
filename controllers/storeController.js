import Home from "../models/Home.js";
import User from "../models/User.js";

export const getHomePage = async (req, res) => {
  console.log("Session Value: ", req.session);

  const registeredHomes = await Home.find();

  res.render("store/index", {
    registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "index",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const getHomesList = async (req, res) => {
  const registeredHomes = await Home.find();

  res.render("store/home-list", {
    registeredHomes,
    pageTitle: "Homes List",
    currentPage: "Home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const getFavorites = async (req, res) => {
  const userId = req.session.user._id;

  const user = await User.findById(userId).populate("favourites");

  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const postAddFavorites = async (req, res) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;

  const user = await User.findById(userId);

  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }

  res.redirect("/favourites");
};

export const postDeleteFavorites = async (req, res) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;

  const user = await User.findById(userId);

  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);

    await user.save();
  }

  res.redirect("/favourites");
};

export const getHomeDetails = async (req, res) => {
  const homeId = req.params.homeId;

  const home = await Home.findById(homeId);

  if (!home) {
    console.log("Home not found");
    return res.redirect("/homes");
  }

  res.render("store/home-detail", {
    home,
    pageTitle: "Home Detail",
    currentPage: "Home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
