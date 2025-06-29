import express, { urlencoded } from "express"
import { configDotenv } from "dotenv";
configDotenv();
import { connectDB } from "./Config/Database.config.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
import authRoutes from "./Routes/Auth.routes.js"
import audioRoutes from "./Routes/Audio.routes.js"
import talwithAiRoutes from "./Routes/TalkAi.routes.js"
import coupenClaimRoutes from "./Routes/Coupen.routes.js"


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

 
app.use("/api/listenify/auth" , authRoutes)
app.use("/api/listenify/create" , audioRoutes)
app.use("/api/listenify/talkwithai" ,talwithAiRoutes)
app.use("/api/listenify/claim" ,coupenClaimRoutes)
const PORT =  5000;

 
 

 
async function server (){
    try {
        await connectDB()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    } catch (error) {
        console.log(error)
    }
}

server();

