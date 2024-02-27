import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the user's name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    entries: {
      type: Number,
      default: 0, // Default value for entries is 0
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
