import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../../config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  filePath: string,
  folder: string = "portfolio",
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return { url: result.secure_url, public_id: result.public_id };
  } catch (error) {

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

export const deleteImage = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
