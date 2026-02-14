import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    houseName: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    photo: String,
    description: String,
  },
  {
    timestamps: true,
  },
);

const Home = mongoose.model("Home", homeSchema);

export default Home;
