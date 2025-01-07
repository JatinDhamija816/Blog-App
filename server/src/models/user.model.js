import { Schema, model } from "mongoose";
import { generateToken } from "../utils/authUtils.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    readHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    savedBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    likeBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  return generateToken(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRY
  );
};

userSchema.methods.generateRefreshToken = function () {
  return generateToken(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRY
  );
};

const User = model("User", userSchema);

export default User;
