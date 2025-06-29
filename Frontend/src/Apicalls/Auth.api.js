import {create} from "zustand";
import { authInstance } from "../utils/axios.auth.js";
export const useAuthStore = create((set,get) => ({
  
    user : null,
    isAuthenticated : false,
    loading : true,



  checkingAuth: async () => {
    try {
      const res = await authInstance.get("/checkAuth");
      set({ 
        user: res?.data?.data?.user, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    }
  },
    
    register : async(data) =>{
        try {
            const res = await authInstance.post("/signup" , data)
            
            set({user : res?.data?.data?.user , isAuthenticated : true})
 
            return {
                success : true,
                data : res?.data?.data?.user,
                message : res?.data?.message
            }

        } catch (error) {
            console.log(error)

            set({user : null , isAuthenticated : false})
            return {
                success : false,
                message : error?.response?.data?.message || "Something went wrong"
            }
        }
    },
    login : async(data) =>{

        console.log(data)
        try {
            const res = await authInstance.post("/login" , data)
            
            set({user : res?.data?.data?.user , isAuthenticated : true})
 
            return {
                success : true,
                data : res?.data?.data?.user,
                message : res?.data?.message
            }

        } catch (error) {
            console.log(error)

            set({user : null , isAuthenticated : false})
            return {
                success : false,
                message : error?.response?.data?.message || "Something went wrong"
            }
        }
    },
     
    profileUpdate : async(data) =>{
             
        try {
            const res = await authInstance.patch("/update/profile" , data,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
              

            console.log(res)
            set({user : res?.data?.data?.user , isAuthenticated : true})
            get().checkingAuth()
 
            return {
                success : true,
                data : res?.data?.data?.user,
                message : res?.data?.message
            } 
    }catch(e){
        console.log(e)
        return {
            success : false,
            message : e?.response?.data?.message || "Something went wrong"
        }
    }
},
    logout : async() =>{
        try {
            const res = await authInstance.post("/logout")
            
            set({user : null , isAuthenticated : false})
 
            return {
                success : true,
                message : res?.data?.message
            }

        }catch(e){
            console.log(e)
            return {
                success : false,
                message : e?.response?.data?.message || "Something went wrong"
            }
        }
    }
}));