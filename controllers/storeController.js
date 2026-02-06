import { deleteFav, readAllFav, updateFav } from "../models/favorite.js";
import { findById, readAll } from "../models/home.js";

export async function getHomePage(req, res, next) {
  const registeredHomes = await readAll();
  res.render("store/index", {
    registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "index",
  });
}

export async function getHomesList(req, res, next) {
  const registeredHomes = await readAll();
  res.render("store/home-list", {
    registeredHomes,
    pageTitle: "Homes List",
    currentPage: "Home",
  });
}

export async function getHomeDetails(req, res, next) {
  const home = await findById(req.params.homeId);
  if (!home) {
    console.log("Home not found");
    res.redirect("/homes");
  } else {
    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      currentPage: "Home",
    });
  }
}

export async function getFavorites(req, res, next) {
  try {
    const favorites = await readAllFav();
    const registeredHomes = await readAll();

    const favouriteHomes = registeredHomes.filter((home) =>
      favorites.includes(home.id),
    );
    res.render("store/favourite-list.ejs", {
      favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  } catch (error) {
    console.error("Unable to get favorites: ", error.message);
  }
}

export async function getBookings(req, res, next) {
  res.render("store/bookings.ejs", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
}

export async function postAddFavorites(req, res, next) {
  try {
    await updateFav(req.body.id);
  } catch (error) {
    console.error("Unable to add to favorites: ", error.message);
  }
  res.redirect("/favourites");
}

export async function postDeleteFavorites(req, res, next) {
  try {
    await deleteFav(req.params.homeId);
  } catch (error) {
    console.error("Unable to delete from favorites: ", error.message);
  }
  res.redirect("/favourites");
}
