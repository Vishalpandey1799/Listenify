import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import { UserModel } from "../Models/User.model.js";
 

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req?.cookies?.token;
         
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      

        const findUser = await UserModel.findById(decoded?.id);

        let {coupon , password, ...rest} = findUser.toObject();
  
         
        req.user = rest;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
};