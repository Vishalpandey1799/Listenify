import express from "express"

const router = express.Router();
import {authMiddleware} from "../Middleware/AuthMiddleware.js"
import { chatOfUser } from "../Controllers/ChatController.js";

router.get("/chat/:toUserId" ,authMiddleware , chatOfUser )

export default router;