import express from "express"

const router = express.Router();
 
import {authMiddleware} from "../Middleware/AuthMiddleware.js"
import { claimCoupon } from "../Controllers/Coupen.js";

router.post("/coupen" ,authMiddleware , claimCoupon)

export default router;