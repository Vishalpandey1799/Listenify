
import axios from "axios"
import {create} from "zustand";

let baseurl = import.meta.env.VITE_SERVER_URL + "/api/listenify/claim";
let coupenInstance = axios.create({
    baseURL : baseurl,
    withCredentials : true
})


 export const useCoupenStore = create((set) => ({
     

    isClaimed : false,
     claimCoupen : async(coupencode) =>{
        try {
            
            let res = await coupenInstance.post("/coupen" , {coupencode})
            set({isClaimed : true})
            console.log(res)

            return {
                success : true,
                message : res?.data?.message
            }
        } catch (error) {
            console.log(error)
            set({isClaimed : false})
            return{
                success : false,
                message : error?.response?.data?.message
            }
        }
     }
 }))