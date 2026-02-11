import {
  create,
  deleteById,
  findById,
  readAll,
  update,
} from "../models/home.js";

export async function getHomes(req, res, next) {
  const registeredHomes = await readAll();

  res.render("host/host-home-list", {
    registeredHomes,
    pageTitle: "Host Homes List",
    currentPage: "host-homes",
    isLoggedIn: req.isLoggedIn,
  });
}

export async function getAddHome(req, res, next) {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn
  });
}

export async function postAddHome(req, res, next) {
  const home = await create(req.body);
  console.log("Home saved successfully");
  res.redirect("/host/host-home-list");
}

export async function getEditHome(req, res, next) {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  const home = await findById(homeId);
  if (!home) {
    console.log("Home not found");
    return res.redirect("/host/host-home-list");
  }
  res.render("host/edit-home", {
    home: home,
    pageTitle: "Edit your Home",
    currentPage: "host-homes",
    editing: editing,
    isLoggedIn: req.isLoggedIn
  });
}

export async function postEditHome(req, res, next) {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = { id, houseName, price, location, rating, photoUrl };
  await update(home);
  res.redirect("/host/host-home-list");
}

export async function deleteHome(req, res, next) {
  const homeId = req.params.homeId;
  try {
    await deleteById(homeId);
    res.redirect("/host/host-home-list");
  } catch (error) {
    console.error("Deletion failed: ", error.message);
  }
}
