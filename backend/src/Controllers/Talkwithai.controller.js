import { errorThrow } from "../Utils/Error.js";
import { successThrow } from "../Utils/Success.js";
import { textToSpeech } from "../Config/Asseblyai.js";
import { uploadFromUrl } from "../Utils/Audiourl.js";
import { murfAudio } from "../Config/Murfai.js";
import { main } from "../Config/Gemini.config.js";
import { aiModel } from "../Models/AItalk.model.js";
import { getVoiceCode } from "../Utils/getVoiceCode.js";
import { UserModel } from "../Models/User.model.js";
 


export const TalkWithAi = async(req,res) =>{
    try {
        if(!req.user){
            return errorThrow(res , 401 , "Unauthorized")
        }
        
        let file = req.file;
         

        let finduser = await UserModel.findById(req.user._id).select("-password");
        if(!finduser){
            return errorThrow(res , 404 , "User not found")
        }

        if(finduser.audioCredits<=0){
            return errorThrow(res , 400 , "No audio credits left")
        }
        if(!file){
            return errorThrow(res , 400 , "Please upload audio file");
        }
        let output = await textToSpeech(file.buffer);

  

        let yo = await main(output,"","",true)
      
         let final = JSON.parse(yo);

      
    
       let voiceId = getVoiceCode(final.language)
     
       if(!final.content.trim()){
        return errorThrow(res , 404 , "Content not found")
       }

       let payload = {
        text : final.content,
        voiceId : voiceId
       }
        let audio = await murfAudio(payload)
    

        if(!audio){
            return errorThrow(res , 404 , "Audio not found")
        }


        let uploadedUrl = await uploadFromUrl(audio)
     
       

        let audioData = await aiModel.create({
            user : req.user?._id,
            audio : uploadedUrl,
            userPrompt : output,
            aiResponse : final.content,

        })
       
        finduser.audioCredits -= 1;
        await finduser.save();
     
         

        return successThrow(res,200,"Talk with ai" ,audioData?.audio)


    } catch (error) {
        console.log(error)
        return errorThrow(res , 500 , "Try again later! ")
    }
}