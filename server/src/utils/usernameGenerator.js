import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export default async function generateUsername(name) {
  if (!name || typeof name !== "string") {
    throw new ApiError(400, "Invalid input. Please enter a valid name.");
  }

  let baseUsername = name
    .toLowerCase()
    .replace(/\s+/g, "") // Remove spaces
    .replace(/[^a-z0-9]/g, ""); // Remove special characters

  // Ensure minimum length for base username
  if (baseUsername.length < 3) {
    baseUsername = `user${baseUsername}`;
  }

  const specialChars = ["_", ".", "-"];
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  const specialChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];

  let username = `${baseUsername}${specialChar}${randomNum}`;

  let userExists = await User.findOne({ username });
  let count = 0;

  while (userExists) {
    count++;
    username = `${baseUsername}${specialChar}${randomNum + count}`;
    userExists = await User.findOne({ username });
  }

  return username;
}
