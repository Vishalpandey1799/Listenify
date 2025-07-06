import fs from "fs/promises"
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


 export const uploadLocalFile = async (filePath) => {
  try {
    
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',  
      folder: 'listenify_pdfs',  
    });

   
    await fs.unlink(filePath);
     

    return result.secure_url;  
  } catch (err) {
    console.error('❌ Cloudinary upload failed:', err);
    throw err;
  }
};
 
 
 