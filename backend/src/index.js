import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./Config/Database.config.js";

// Load environment variables
configDotenv();

// Routes
import authRoutes from "./Routes/Auth.routes.js";
import audioRoutes from "./Routes/Audio.routes.js";
import talwithAiRoutes from "./Routes/TalkAi.routes.js";
import coupenClaimRoutes from "./Routes/Coupen.routes.js";
import connectionRequest from "./Routes/Connection.routes.js";
import chatRoutes from "./Routes/chat.routes.js"
import getToken from "./Routes/streamToken.routes.js"
import { initializeSocket } from "./Config/Socket.io.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Routes
app.use("/api/listenify/auth", authRoutes);
app.use("/api/listenify/create", audioRoutes);
app.use("/api/listenify/talkwithai", talwithAiRoutes);
app.use("/api/listenify/claim", coupenClaimRoutes);
app.use("/api/listenify/connection", connectionRequest);
app.use("/api/listenify/user", chatRoutes);
app.use("/api/listenify/", getToken);

// Create HTTP + WebSocket server
const server = createServer(app);
// Optional: Attach io to app if needed in routes or controllers
 initializeSocket(server);

// Connect DB and start server
async function startServer() {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`✅ Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
}

startServer();
