import dotenv from "dotenv";
dotenv.config();

import { AssemblyAI } from "assemblyai";

 
 

 
 export const textToSpeech = async(audioblob) =>{
          let client = new AssemblyAI({apiKey: process.env.ASSEMBLYAI_KEY || "8e9c5b4b248a4528b0734e14f02942f4"});

const params = {
  audio: audioblob,
  speech_model: "universal",
};

const transcript = await client.transcripts.transcribe(params)

console.log(transcript.text)

 return transcript.text;

}

 
