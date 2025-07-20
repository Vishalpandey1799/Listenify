
import axios from "axios";
let baseurl = import.meta.env.VITE_SERVER_URL + "connection";

export const connectionAxios = axios.create({
    baseURL : baseurl,
    withCredentials : true,
    
})