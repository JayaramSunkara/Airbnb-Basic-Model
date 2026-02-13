import fs from "fs/promises";
import Home from "../models/Home.js";

export const getHomes = async (req, res) => {
  try {
    const registeredHomes = await Home.find();

    res.render("host/host-home-list", {
      registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getAddHome = async (req, res) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const postAddHome = async (req, res) => {
  try {
    const { houseName, price, location, rating, description } = req.body;

    if (!req.file) {
      return res.status(422).send("No image provided");
    }

    const photo = req.file.path;

    const home = new Home({
      houseName,
      price,
      location,
      rating,
      photo,
      description,
    });

    await home.save();

    res.redirect("/host/host-home-list");
  } catch (err) {
    res.status(500).send("Error saving home");
  }
};

export const getEditHome = async (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

export const postEditHome = async (req, res) => {
  try {
    const { id, houseName, price, location, rating, description } = req.body;

    const home = await Home.findById(id);

    if (!home) {
      return res.status(404).send("Home not found");
    }

    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.description = description;

    if (req.file) {
      try {
        await fs.unlink(home.photo);
      } catch (err) {
        console.log("Error while deleting file", err);
      }

      home.photo = req.file.path;
    }

    await home.save();

    res.redirect("/host/host-home-list");
  } catch (err) {
    console.log("Error while editing home", err);
    res.status(500).send("Failed to update home");
  }
};

export async function deleteHome(req, res, next) {
  const homeId = req.params.homeId;
  try {
    await Home.findByIdAndDelete(homeId);
    res.redirect("/host/host-home-list");
  } catch (error) {
    console.error("Deletion failed: ", error.message);
  }
}
