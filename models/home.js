import Home from "./homeSchema.js";

export async function create({ houseName, price, location, rating, photoUrl }) {
  await Home.create({ houseName, price, location, rating, photoUrl });
}

export async function readAll() {
  try {
    const data = await Home.find();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function update(home) {
  try {
    const { id, ...data } = home;

    await Home.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    console.log("Writing to DB successful");
  } catch (error) {
    console.error("Writing to DB unsuccessful:", error.message);
  }
}

export async function deleteById(homeId) {
  try {
    await Home.findByIdAndDelete(homeId);
  } catch (error) {
    console.error("Writing to file not successful: ", error);
  }
}

export async function findById(homeId) {
  return await Home.findById(homeId);
}
