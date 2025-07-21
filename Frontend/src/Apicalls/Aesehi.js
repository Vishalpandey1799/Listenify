import axios from "axios";

let baseURL = import.meta.VITE_SERVER_URL || "http://localhost:5000/api/listenify/token"

export const fetchToken = async () => {
  try {
    const res = await axios.post(
      `${baseURL}api/listenify/token`,
      {},                        
      { withCredentials: true }  
    );

    
    return res.data.data;       
  } catch (e) {
    console.error("fetchToken error:", e?.response?.data || e.message);
    throw e;
  }
};
