import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import User from "../../models/user.model.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import generateUsername from "../../utils/usernameGenerator.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../config/constants.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!EMAIL_REGEX.test(sanitizedEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  if (!PASSWORD_REGEX.test(sanitizedPassword)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  const username = await generateUsername(name);

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar");
  }

  const user = await User.create({
    name,
    email,
    password,
    username,
    avatar: avatar.url,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export default registerUser;
