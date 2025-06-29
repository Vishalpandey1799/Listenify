import Mercury from "@postlight/mercury-parser";
import striptags from "striptags";
import { main } from "../Config/Gemini.config.js";
 

let url = "https://www.theinformation.com/articles/little-known-startup-surged-past-scale-ai-without-investors"

const UrlParser = async(url) =>{
    
    
   let res = await Mercury.parse(url)
   let cleanText = striptags(res.content || "")

   console.log("clean loda" , cleanText)
   if(!cleanText.trim()){
      
      console.log("lwda lele")
      return;
   }


 
    
   
   let final = await main(cleanText)

   console.log(final)

   
}


UrlParser(url)
// export const pdfParser = async(file) =>{

// }