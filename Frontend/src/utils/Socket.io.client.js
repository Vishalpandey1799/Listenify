import {io} from "socket.io-client";


export const connecttoSokketayyo = () => {
  const ayyo = io("https://listenify-cmi7.onrender.com", {
    // path: "/api/listenify/",
    withCredentials: true,
    transports: ["websocket", "polling"],  
  });
  return ayyo;
};
