import {errorThrow} from "../Utils/Error.js"
import {successThrow} from "../Utils/Success.js"
import {UserModel}  from "../Models/User.model.js"
import { UrlParser , pdfParser } from "../Utils/Parser.js"
import axios from "axios"
import { cloudinary } from "../Config/Cloudinary.config.js"
import { audioModel } from "../Models/Audio.model.js"
import { getVoiceCode } from "../Utils/getVoiceCode.js"
import { uploadFromUrl } from "../Utils/Audiourl.js"
import { murfAudio } from "../Config/Murfai.js"
import { main } from "../Config/Gemini.config.js"
 


export const contentFromUrl = async (req, res) => {
  try {
    
    if (!req.user) return errorThrow(res, 401, "Unauthorized");

    const { url, language, voice } = req.query;
    console.log(url)

    
    if (!url) return errorThrow(res, 400, "Please enter URL");

  
    const finduser = await UserModel.findById(req.user._id).select("-password");
    if (!finduser) return errorThrow(res, 404, "User not found");

    if(finduser.audioCredits<=0){
        return errorThrow(res, 400, "No audio credits left");
    }
    
    let finalvoice = getVoiceCode(language, voice , null);

    
    const content = await UrlParser(url, "", language || "English" , null,false);
    if (!content || content.trim() === "") {
      return errorThrow(res, 404, "Content not found");
    }

   
    const murfPayload = {
      text: content,
      voiceId: finalvoice,
    };

    const audioUrl =  await murfAudio(murfPayload)
    console.log(audioUrl)
    
   
    if (!audioUrl) {
      return errorThrow(res, 404, "Something went wrong while converting to audio");
    }

  
   

    const uploadedUrl = await uploadFromUrl(audioUrl);

   
    const audioData = await audioModel.create({
      user: finduser._id,
      audio: uploadedUrl,
      parsedText: content,
      originalUrl: url,
    });


    
    finduser.audioCredits -= 1;
    await finduser.save();
 
    return successThrow(res, 200, "Audio created sucessfully! ", audioData);
  } catch (error) {
    console.error(error);
    return errorThrow(res, 500, error.message);
  }
};

export const contentFromPdf = async(req,res) =>{
    try {


      if(!req.user){
        return errorThrow(res , 401 , "Unauthorized")
      }


      const findUser = await UserModel.findById(req.user._id).select("-password");
      if(!findUser){
        return errorThrow(res , 404 , "User not found")
      }

      if(findUser.audioCredits<=0){
        return errorThrow(res , 400 , "No audio credits left")
      }

       const { language , voice} = req.body;
        let file = req.file;
    
        if(!req.user){
            return errorThrow(res , 401 , "Unauthorized")
        }
        if(!file){
            return errorThrow(res , 400 , "Please upload pdf file");
        }

        let output = await pdfParser(file)

        if(!output || output.trim() === ""){
            return errorThrow(res , 404 , "Content not found or 500 words only")
        }

    
        let filtered = await main(output,language,null,false)
         
         if (!filtered || filtered.trim() === "") {
      return errorThrow(res, 404, "Content not found");
    }

      let voiceCode = getVoiceCode(language,voice)
         console.log("voice code" , voiceCode)

     const murfPayload = {
       text : filtered,
       voiceId : voiceCode
     }

     let audioUrl = await murfAudio(murfPayload)
    

     if(!audioUrl){
        return errorThrow(res , 404 , "Something went wrong while converting to audio")
     }

     let url = await uploadFromUrl(audioUrl)


     let audioData = await audioModel.create({
        user: req.user._id,
        audio : url,
        parsedText : filtered,
        originalUrl : file.originalname
     })


     findUser.audioCredits -= 1;
     await findUser.save();
     return successThrow(res,200,"Audio created" , audioData)
    } catch (error) {
        console.log(error)
    }
}
 

export const contentFromText = async (req, res) => {
  try {
   
    if (!req.user) {
      return errorThrow(res, 401, "Unauthorized");
    }

    const { text, language, voice } = req.body;


    let finduser = await UserModel.findById(req.user._id).select("-password");

    if(finduser.audioCredits<=0){
        return errorThrow(res, 400, "No audio credits left");
    }
    if (!finduser) {
      return errorThrow(res, 404, "User not found");
    }
   
    if (!text) {
      return errorThrow(res, 400, "Please enter text");
    }


      let filtered = await UrlParser("",text, language, "text", false); 
      console.log(filtered)
    

    if (!filtered) {
      return errorThrow(res, 404, "Content not found");
    }
 
    const voiceId = getVoiceCode(language, voice);
    const murfPayload = { text: filtered, voiceId : voiceId };
    
    const audioUrl = await murfAudio(murfPayload);

    console.log(audioUrl)

    if (!audioUrl) {
      return errorThrow(res, 500, "Something went wrong while converting to audio");
    }

 
    const uploadedUrl = await uploadFromUrl(audioUrl);

   
 
    const audioData = await audioModel.create({
      user: req.user._id,
      audio: uploadedUrl,
      parsedText: filtered,
      originalUrl: text
    });


    finduser.audioCredits -= 1;
    await finduser.save();
   
    return successThrow(res, 200, "Audio created", audioData);
  } catch (error) {
    console.error("Error in contentFromText:", error);
    return errorThrow(res, 500, "Internal server error");
  }
};

export const getHelpResponse = async (req, res) => {
  try {
    if (!req.user) {
      return errorThrow(res, 401, "Unauthorized");
    }

      let isUser = await UserModel.findById(req.user._id)
 
      if (!isUser.audioCredits) {
        return errorThrow(res, 400, "No audio credits left");
    }

    
  

    const { text, language } = req.body;

    if (!text || !language) {
      return errorThrow(res, 400, "Please provide a valid query and language");
    }


  
    const responseText = await UrlParser("",text, language, "text", true);
    console.log(responseText)

    if (!responseText) {
      return errorThrow(res, 404, "Could not generate a help response");
    }

    return successThrow(res, 200, "Help content generated", { simplified: responseText });
  } catch (error) {
    console.error("Help generation error:", error);
    return errorThrow(res, 500, "Internal server error");
  }
};


export const latestAudio = async(req,res) =>{
  try {
    if(!req.user){
      return errorThrow(res , 401 , "Unauthorized")
    }

    let audioData = await audioModel.find({user : req.user._id}).sort({createdAt : -1}).limit(3);
    if(!audioData){
      return errorThrow(res , 404 , "No audio found")
    }

    
    return successThrow(res , 200 , "Audio found" , audioData)
  } catch (error) {
    console.log(`Error in latest audio ${error}`)
    return errorThrow(res , 500 , "Internal server error")
  }
}



export const getAllAudioandLinks = async(req,res) =>{
  try {
    if(!req.user){
      return errorThrow(res , 401 , "Unauthorized")
    }

    let audioData = await audioModel.find({user : req.user._id}).sort({createdAt : -1})
    if(!audioData){
      return errorThrow(res , 404 , "No audio found")
    }

    
    return successThrow(res , 200 , "Audio found" , audioData)
  } catch (error) {
    console.log(`Error in latest audio ${error}`)
    return errorThrow(res , 500 , "Internal server error")
  }
}