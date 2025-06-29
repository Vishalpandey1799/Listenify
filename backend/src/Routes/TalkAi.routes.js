import express from "express"
import {authMiddleware} from "../Middleware/AuthMiddleware.js"
import { fileUpload } from "../Config/Multer.js";
import { TalkWithAi } from "../Controllers/Talkwithai.controller.js";

const router = express.Router();


router.post("/audio" , authMiddleware , fileUpload , TalkWithAi)
export default router;