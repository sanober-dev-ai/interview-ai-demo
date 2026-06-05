import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    plan: {
      type: String,
      default: "FREE",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
