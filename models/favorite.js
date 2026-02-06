import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const favoriteDataPath = path.join(__dirname, "../data/favorite.js");

export async function readAllFav() {
  try {
    const favoriteHomes = await fs.readFile(favoriteDataPath, "utf8");
    return JSON.parse(favoriteHomes);
  } catch (error) {
    console.error("Error while reading favorites file:", error.message);
    return [];
  }
}

export async function updateFav(homeId) {
  let favoriteHomes = await readAllFav();
  if (favoriteHomes.includes(homeId)) return "Home is already marked favourite";
  favoriteHomes.push(homeId);
  try {
    await fs.writeFile(favoriteDataPath, JSON.stringify(favoriteHomes), "utf8");
    return "Added to favourites";
  } catch (error) {
    console.error("Error writing file: ", error.message);
    return "Failed to update favourites";
  }
}

export async function deleteFav(homeId) {
  let favoriteHomes = await readAllFav();
  favoriteHomes = favoriteHomes.filter((id) => id !== homeId);
  try {
    await fs.writeFile(
      favoriteDataPath,
      JSON.stringify(favoriteHomes),
      "utf-8",
    );
  } catch (error) {
    console.error("Error writing file: ", error.message);
    return "Failed to delete favourites";
  }
}
