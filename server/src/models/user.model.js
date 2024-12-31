import { Schema, model } from "mongoose";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/authUtils";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    bio: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await comparePassword(password, this.password);
};

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
