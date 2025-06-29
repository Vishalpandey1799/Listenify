import Mercury from "@postlight/mercury-parser";
import striptags from "striptags";
import PdfParse from "pdf-parse";
import { main } from "../Config/Gemini.config.js";
 

 

export const UrlParser = async(url,text,language,type,help) =>{
    
    let final = "";


   let res = await Mercury.parse(url)

      if(type){
   let cleanText = striptags(text || "")
   return final = await main(cleanText,language)
      
   }
   let cleanText = striptags(res.content || "")
 
   if(!cleanText.trim()){
      
     console.log("Sometimes content is short or be truncate and behind the login or signup page")
      return;
   }

   
    final = await main(cleanText,language,help)

    return final;

   
}


 
export const pdfParser = async(file,language) =>{
   try {
      if(!file && !file.buffer){
         return;
      }

      let data = await PdfParse(file.buffer)
 

   
      let clearText =  striptags(data.text)
      console.log(clearText)


      let lengthh  = clearText.split(/\s+/).length
      
      if(lengthh>1500){
         return ""
      }

      
 
      let final = await main(clearText,language)
      

      return final;
   } catch (error) {
      console.log(error)
   }
}