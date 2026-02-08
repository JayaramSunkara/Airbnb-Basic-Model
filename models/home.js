import { getDB } from "../utils/dbUtil.js";
import { ObjectId } from "mongodb";

export async function create({ houseName, price, location, rating, photoUrl }) {
  try {
    const db = getDB();

    const home = {
      houseName,
      price: Number(price),
      location,
      rating: Number(rating),
      photoUrl,
      createdAt: new Date(),
    };

    await db.collection("homes").insertOne(home);
  } catch (error) {
    console.error("Create failed:", error.message);
  }
}

export async function readAll() {
  try {
    const db = getDB();

    const homes = await db.collection("homes").find().toArray();

    return homes.map((home) => ({
      ...home,
      id: home._id.toString(), // normalize
    }));
  } catch (error) {
    console.error("Read failed:", error);
    return [];
  }
}

export async function update(home) {
  try {
    const db = getDB();

    const { id, ...data } = home;

    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    await db
      .collection("homes")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    console.log("Writing to DB successful");
  } catch (error) {
    console.error("Writing to DB unsuccessful:", error.message);
  }
}

export async function deleteById(homeId) {
  try {
    const db = getDB();

    await db.collection("homes").deleteOne({
      _id: new ObjectId(homeId),
    });
  } catch (error) {
    console.error("Delete failed:", error);
  }
}

export async function findById(homeId) {
  try {
    const db = getDB();

    const home = await db.collection("homes").findOne({
      _id: new ObjectId(homeId),
    });

    if (!home) return null;

    return {
      ...home,
      id: home._id.toString(),
    };
  } catch (error) {
    console.error("Find failed:", error);
    return null;
  }
}
