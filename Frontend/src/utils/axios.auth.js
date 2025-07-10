
let baseurl = import.meta.env.VITE_SERVER_URL + "auth";
 
import axios from "axios"
export const  authInstance = axios.create({
    baseURL : baseurl,
    withCredentials : true
})