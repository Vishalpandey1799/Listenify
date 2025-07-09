import axios from "axios";
export const audioInstance = axios.create({
    baseURL : import.meta.env.VITE_SERVER_URL + "/api/listenify/create",
       headers :{
         "Content-Type" : "application/json"
    },
    withCredentials : true,
 
})