import {StreamChat} from "stream-chat"
import dotenv from "dotenv"
import {successThrow} from "../Utils/Success.js"
dotenv.config();




const apikey = process.env.STREAM_API_KEY || "wsvmwccdgb9z"
const apiSecret = process.env.STREAM_API_SECRET || "3vyn86gxegtqn4wkgjpxz2f43xeztfccx4zuruqzhzdx6vpwrjpczy2pu2sccehj"

if(!apikey || !apiSecret){
  console.log("key are missing")
  throw new Error("Missing Stream API key or secret");
}

const streamClient = StreamChat.getInstance(apikey, apiSecret);
 

export const generateStreamToken = async(userId) =>{
    try{
        const id = userId.toString();

        return streamClient.createToken(id)
    }catch(e){
      console.log(e)
    }
}

export const getStreamToken = async(req,res) =>{
  try{
    const token = await generateStreamToken(req.user?._id);
     return successThrow(res , 200 , "Token generated" , token)
  }catch(e){
    console.log(e)
  }
}