import {io} from "socket.io-client";

export const connecttoSokketayyo = () =>{
    let ayyo = io("http://localhost:5000" ,{
        withCredentials : true
    });
    return ayyo;
}