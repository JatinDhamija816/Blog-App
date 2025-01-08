import { Schema, model } from "mongoose";

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
    isProfileSetupComplete: {
      type: Boolean,
      default: false,
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

const User = model("User", userSchema);

export default User;
