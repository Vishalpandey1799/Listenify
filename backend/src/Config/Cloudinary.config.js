import {v2 as cloudinary} from "cloudinary"
 import {Readable} from "stream"


cloudinary.config({
   cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
   api_key : process.env.CLOUDINARY_API_KEY,
   api_secret : process.env.CLOUDINARY_API_SECRET
})




const uploadWithCloudinary = (buffer) => {
              return new Promise((resolve, reject) => {
                  const stream = cloudinary.uploader.upload_stream(
                      { folder: "audios", 
                        resource_type : "auto",
                          
                        
                      },
                   
                    
                      (error, result) => {
                          if (error) reject(error);
                          else resolve(result);
                      }
                  );
                  Readable.from(buffer).pipe(stream);
              });
          }
      
          
export {
    cloudinary,
    uploadWithCloudinary
}