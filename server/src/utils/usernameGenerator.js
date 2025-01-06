import User from "../models/user.model.js";

export default async function generateUsername(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid input. Please enter a valid name.");
  }

  let baseUsername = name
    .toLowerCase()
    .replace(/\s+/g, "") // Remove spaces
    .replace(/[^a-z0-9]/g, ""); // Remove special characters

  const specialChars = ["_", ".", "-", ""];
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  const specialChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];

  let username = `${baseUsername}${specialChar}${randomNum}`;

  let userExists = await User.findOne({ username });

  let count = 1;
  while (userExists) {
    username = `${baseUsername}${specialChar}${randomNum + count}`;
    userExists = await User.findOne({ username });
    count++;
  }

  return username;
}
