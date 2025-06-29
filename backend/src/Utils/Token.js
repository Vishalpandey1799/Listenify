import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

 
 
export const generateToken = (res,id) =>{
    const token = jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn : "7d"
    })

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "DEVELOPMENT",  
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});



     return token;
}