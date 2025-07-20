import express from "express"
import { authMiddleware } from "../Middleware/AuthMiddleware.js";
import {  getStreamToken,} from "../Controllers/Streammm.js";

const router = express.Router();

 
router.post("/token" ,authMiddleware , getStreamToken)
 

export default router;