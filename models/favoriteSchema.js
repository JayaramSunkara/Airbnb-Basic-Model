import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true,
  },
});

const favorite = mongoose.model("favourite", favouriteSchema);

export default favorite;
