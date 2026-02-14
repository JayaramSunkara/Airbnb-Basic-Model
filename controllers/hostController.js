import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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

export const getAddHome = (req, res) => {
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

    const photo = "/uploads/" + req.file.filename;

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
  try {
    const { homeId } = req.params;
    const { editing } = req.query;

    const home = await Home.findById(homeId);

    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    res.render("host/edit-home", {
      home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.error("Error fetching home:", err);
    res.redirect("/host/host-home-list");
  }
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
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.resolve(__dirname, "..", "." + home.photo);
        await fs.unlink(filePath);
      } catch (err) {
        console.log("Error while deleting file", err);
      }

      home.photo = "/uploads/" + req.file.filename;
    }

    await home.save();

    res.redirect("/host/host-home-list");
  } catch (err) {
    console.log("Error while editing home", err);
    res.status(500).send("Failed to update home");
  }
};

export const deleteHome = async (req, res) => {
  const homeId = req.params.homeId;
  try {
    const home = await Home.findById(homeId);
    console.log(home);
    await Home.findByIdAndDelete(homeId);

    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.resolve(__dirname, "..", "." + home.photo);
      console.log(filePath);
      await fs.unlink(filePath);
    } catch (err) {
      console.log("Error while deleting file", err);
    }

    res.redirect("/host/host-home-list");
  } catch (error) {
    console.error("Deletion failed: ", error.message);
  }
};
