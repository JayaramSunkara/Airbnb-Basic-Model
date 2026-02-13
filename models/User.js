import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  userType: {
    type: String,
    enum: ["guest", "host"],
    default: "guest",
  },

  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Home",
    },
  ],
});

export default model("User", userSchema);
