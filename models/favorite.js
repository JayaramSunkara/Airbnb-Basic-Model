import { ObjectId } from "mongodb";
import { getDB } from "../utils/dbUtil.js";

export async function readAllFav() {
  try {
    const db = getDB();

    return await db.collection("favourites").find().toArray();
  } catch (error) {
    console.error("Error while reading favorite in DB:", error.message);
    return [];
  }
}

export async function updateFav(homeId) {
  try {
    const db = getDB();

    const favorite = {
      houseId: new ObjectId(homeId), 
      createdAt: new Date(),
    };

    await db.collection("favourites").insertOne(favorite);

    return "Added to favourites";
  } catch (error) {
    console.error("Error writing favorite in DB:", error.message);
    return "Failed to update favourites";
  }
}

export async function deleteFav(homeId) {
  try {
    const db = getDB();

    await db.collection("favourites").deleteOne({
      houseId: new ObjectId(homeId), 
    });
  } catch (error) {
    console.error("Error deleting favourite:", error.message);
    return "Failed to delete favourites";
  }
}
