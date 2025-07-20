import {create} from "zustand";
import { connectionAxios } from "../utils/axios.connection.js";
 
 
 

export const useConnectionStore = create((set,get) => ({
    currentFriends : null,
    loading : false,
    allUser : [],
    pending : null,
    onlineUserIds : [],


    setOnlineUserIds: (ids) => set({ onlineUserIds: ids }),
     


    sendFriendRequest : async(id) =>{

        try {
            
            let res = await connectionAxios.post(`/send/${id}`);
          
           await get().pendingRequests();
           await get().allLearners();
        } catch (error) {
            console.log("error" , error)
        }
           
    },


    allLearners : async() =>{
           let res = await connectionAxios.get("/all-learners");
           
           set({allUser : res?.data?.data});
    },

    pendingRequests : async() =>{

       try {
               let res = await connectionAxios.get("/pending");
         
             
           set({pending : res?.data?.data || []});
       } catch (error) {
               set({pending : []})
       }
          
    },

    acceptFriendRequest : async(id) =>{
        let res = await connectionAxios.patch(`/accept/${id}`);
    

        await get().pendingRequests()
        await get().myFriends()
        await get().allLearners()
    },


    declineFriendRequest : async(id) =>{
       let res = await connectionAxios.delete(`/reject/${id}`)
    
        await get().pendingRequests()

    },
    
    cancelFriendRequest : async(id) =>{
        try {
            let res = await connectionAxios.delete(`/cancle/${id}`)
         
            await get().pendingRequests();
            await get().allLearners();
        } catch (error) {
            console.log("error" , error)
        }
    },

    myFriends : async() =>{

       try {
               let res = await connectionAxios.get("/friends");
         
        set({currentFriends : res?.data?.data || []});
       } catch (error) {
        set({currentFriends :  []});
              
       }
       
    }



}));