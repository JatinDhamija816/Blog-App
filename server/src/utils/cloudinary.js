import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    await fs.unlink(localFilePath);

    return response;
  } catch (error) {
    try {
      await fs.unlink(localFilePath);
    } catch (cleanupError) {
      console.error("Error cleaning up local file:", cleanupError.message);
    }

    return null;
  }
};

export default uploadOnCloudinary;
