import mongoose from "mongoose";
import Favorite from "./favoriteSchema.js";

const homeSchema = new mongoose.Schema(
  {
    houseName: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    photoUrl: String,
    description: String,
  },
  {
    timestamps: true,
  },
);

homeSchema.pre("findOneAndDelete", async function (next) {
  const homeId = this.getQuery()._id;
  await Favorite.deleteMany({ houseId: homeId });
});

const Home = mongoose.model("Home", homeSchema);

export default Home;
