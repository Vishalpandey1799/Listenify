import axios from "axios";

let baseURL = "https://listenify-cmi7.onrender.com/"

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
