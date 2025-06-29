import axios from "axios"

let baseurl = import.meta.env.VITE_SERVER_URL + "/api/listenify/talkwithai";
export const talkingTomInstance = axios.create({
    baseURL : baseurl,
    withCredentials : true,
    headers : {
        "Content-Type" : "multipart/form-data"
    }
})