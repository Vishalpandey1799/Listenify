import express, { urlencoded } from "express"
import { configDotenv } from "dotenv";
configDotenv();
import { connectDB } from "./src/Config/Database.config.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
import authRoutes from "./src/Routes/Auth.routes.js"
import audioRoutes from "./src/Routes/Audio.routes.js"
import talwithAiRoutes from "./src/Routes/TalkAi.routes.js"
import coupenClaimRoutes from "./src/Routes/Coupen.routes.js"


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

