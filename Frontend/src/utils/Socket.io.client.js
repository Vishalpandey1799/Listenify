import {io} from "socket.io-client";


export const connecttoSokketayyo = () =>{
    let ayyo = io("https://listenify-cmi7.onrender.com/api/listenify" ,{
        withCredentials : true
    });
    return ayyo;
}