import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true,
  },
});

const Favorite = mongoose.model("Favourite", favouriteSchema);

export default Favorite;
