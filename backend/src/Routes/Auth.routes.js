import express from "express";
import { fileUpload } from "../Config/Multer.js";
import { checkingAuth, login, logout, signup, updateUser } from "../Controllers/User.Controller.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";

const router = express();

router.post("/signup" , signup)
router.post("/login" , login);
router.post("/logout" , logout);
router.patch("/update/profile" , authMiddleware , fileUpload , updateUser)
router.get("/checkAuth" , authMiddleware , checkingAuth)

export default router;