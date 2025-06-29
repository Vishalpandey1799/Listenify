   import axios from "axios";
   import dotenv from "dotenv"
   
  dotenv.config();
   export const murfAudio =  async (murfPayload) =>{

     const audio = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      murfPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.MURF_KEY,
        },
      }
    
    );

    return audio.data?.audioFile;
   }
   