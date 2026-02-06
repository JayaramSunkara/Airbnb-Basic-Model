import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const homeDataPath = path.join(__dirname, "../data/homes.json");

export function create({ houseName, price, location, rating, photoUrl }) {
  return {
    id: null,
    houseName,
    price,
    location,
    rating,
    photoUrl,
    createdAt: new Date(),
  };
}

export async function readAll() {
  try {
    const data = await fs.readFile(homeDataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function update(home) {
  let registeredHomes = await readAll();
  if (home.id) {
    registeredHomes = registeredHomes.map((element) =>
      element.id === home.id ? home : element,
    );
  } else {
    home.id = Math.random().toString();
    registeredHomes.push(home);
  }
  try {
    await fs.writeFile(
      homeDataPath,
      JSON.stringify(registeredHomes, null, 2),
      "utf8",
    );
    console.log("Writing to DB successful");
  } catch (error) {
    console.error("Writing to file unsuccessful: ", error);
  }
}

export async function deleteById(homeId) {
  let registeredHomes = await readAll();
  registeredHomes = registeredHomes.filter((home) => home.id !== homeId);
  try {
    await fs.writeFile(
      homeDataPath,
      JSON.stringify(registeredHomes, null, 2),
      "utf8",
    );
  } catch (error) {
    console.error("Writing to file not successful: ", error);
  }
}

export async function findById(homeId) {
  const registeredHomes = await readAll();
  return registeredHomes.find((home) => home.id === homeId);
}
