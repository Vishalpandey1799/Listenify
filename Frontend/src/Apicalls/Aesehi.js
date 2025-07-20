import axios from "axios";

export const fetchToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/listenify/token",
      {},                        
      { withCredentials: true }  
    );

    
    return res.data.data;       
  } catch (e) {
    console.error("fetchToken error:", e?.response?.data || e.message);
    throw e;
  }
};
