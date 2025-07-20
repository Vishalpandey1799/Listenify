import express from "express"

const router = express.Router();

import {authMiddleware} from "../Middleware/AuthMiddleware.js"
import { acceptFriendRequest, cancelFriendRequest, getAllUsers, getFriends, getPendingRequest, rejectFriendRequest, sendFriendRequest, unfriend } from "../Controllers/Connection.controlller.js";

 
router.post("/send/:id" , authMiddleware , sendFriendRequest)
router.delete("/cancle/:id" , authMiddleware , cancelFriendRequest)
router.delete("/reject/:id" , authMiddleware , rejectFriendRequest)
router.patch("/accept/:id" , authMiddleware , acceptFriendRequest)
router.delete("/unfriend/:id" , authMiddleware , unfriend)

router.get("/pending" , authMiddleware , getPendingRequest)
router.get("/friends" , authMiddleware , getFriends )
router.get("/all-learners" , authMiddleware , getAllUsers)

export default router;