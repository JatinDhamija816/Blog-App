import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import User from "../../models/user.model.js";
import generateUsername from "../../utils/usernameGenerator.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import {
  BCRYPT_SALT_ROUNDS,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../config/constants.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (
    [name, email, password, confirmPassword].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Invalid email format.");
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and Confirm Password do not match");
  }

  const existedUser = await User.findOne({ email: email.trim().toLowerCase() });
  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const username = await generateUsername(name);

  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    password: hashedPassword,
    username,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

export default register;
