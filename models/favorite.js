import Favorite from "./favoriteSchema.js";

export async function readAllFav() {
  try {
    return await Favorite.find();
  } catch (error) {
    console.error("Error while reading favorite in DB", error.message);
    return [];
  }
}

export async function updateFav(homeId) {
  try {
    await Favorite.create({ houseId: homeId });
    return "Added to favourites";
  } catch (error) {
    console.error("Error writing favorite in DB: ", error.message);
    return "Failed to update favourites";
  }
}

export async function deleteFav(homeId) {
  try {
    await Favorite.findOneAndDelete({houseId: homeId})
  } catch (error) {
    console.error("Error writing file: ", error.message);
    return "Failed to delete favourites";
  }
}
