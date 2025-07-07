import express from "express"

const router = express.Router();

import {authMiddleware} from "../Middleware/AuthMiddleware.js"
import { acceptFriendRequest, cancelFriendRequest, getAcceptedRequest, getPendingRequest, sendFriendRequest, unfriend } from "../Controllers/Connection.controlller.js";

 
router.post("/request/send/:id" , authMiddleware , sendFriendRequest)
router.delete("/request/cancel/:id" , authMiddleware , cancelFriendRequest)
router.patch("/request/accept/:id" , authMiddleware , acceptFriendRequest)
router.delete("/request/unfriend/:id" , authMiddleware , unfriend)
router.get("/request/pending" , authMiddleware , getPendingRequest)
router.get("/request/accepted" , authMiddleware , getAcceptedRequest )

export default router;