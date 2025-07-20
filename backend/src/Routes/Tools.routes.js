import express from "express"

const router = express.Router();

import { authMiddleware } from "../Middleware/AuthMiddleware.js"
import { getPdfsOfWebsite, screenRecorder } from "../Controllers/NewAitools.controller.js";
router.post("/screen-record", authMiddleware, screenRecorder)
router.post("/web-to-pdf", authMiddleware, getPdfsOfWebsite)

export default router;