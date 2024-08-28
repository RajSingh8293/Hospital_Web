import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

// Upload an image
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "jobHunting",
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

// delet image
export const deleteOnCloudinary = async (public_id) => {
  if (!public_id) return null;
  try {
    return await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
    return null;
  }
};
