import express from "express";
import {authMiddleware} from "../Middleware/AuthMiddleware.js"
import { contentFromPdf, contentFromUrl , contentFromText, getHelpResponse, latestAudio, getAllAudioandLinks } from "../Controllers/AudioController.js";
import { fileUpload } from "../Config/Multer.js";
const router = express.Router();



router.post("/url" , authMiddleware , contentFromUrl )
router.post("/pdf" , authMiddleware , fileUpload, contentFromPdf )
router.post("/text" , authMiddleware , contentFromText);
router.post("/help" , authMiddleware , getHelpResponse)
router.get("/latest" , authMiddleware , latestAudio)
router.get("/all" , authMiddleware , getAllAudioandLinks)




export default router;