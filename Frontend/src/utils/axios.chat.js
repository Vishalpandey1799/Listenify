import axios from "axios";

export const chatInstance = axios.create({
    baseURL : import.meta.env.VITE_SERVER_URL + "api/listenify/user",
    withCredentials : true,
})