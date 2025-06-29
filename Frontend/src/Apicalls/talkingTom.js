import {create} from "zustand";
import { talkingTomInstance } from "../utils/tomInstance.js";

export const useTalkingTom = create((set) => ({
    
    currentAudio : null,

    sendToBackend : async(blob) =>{
          console.log(blob)

          let formdata = new FormData();
          formdata.append("file" , blob)
            try {
                let res = await talkingTomInstance.post("/audio" ,formdata );
                console.log(res)

                set({currentAudio : res?.data?.data})
                return {
                    success : true,
                    data : res?.data?.data
                }

            } catch (error) {
                console.log(error)
                set({currentAudio : null})

                return {
                    success : false,
                    message : error?.response?.data?.message
                }
            }
    }
    

}))