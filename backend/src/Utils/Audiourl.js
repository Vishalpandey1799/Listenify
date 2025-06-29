    
import { cloudinary } from "../Config/Cloudinary.config.js";
    export const uploadFromUrl = async (url) => {
      try {
        const result = await cloudinary.uploader.upload(url, {
          resource_type: "auto",
        });
        return result.secure_url;
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        throw err;
      }
    };