
let baseurl = import.meta.env.VITE_SERVER_URL + "/api/listenify/auth";
 
import axios from "axios"
export const  authInstance = axios.create({
    baseURL : baseurl,
    withCredentials : true
})