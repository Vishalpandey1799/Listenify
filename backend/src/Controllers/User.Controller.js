
import { hashPassword , verifyPassword } from "../Utils/Passoword.js";
import { generateToken } from "../Utils/Token.js";

import { successThrow } from "../Utils/Success.js";
import { errorThrow } from "../Utils/Error.js";
import { UserModel } from "../Models/User.model.js";
import { uploadWithCloudinary } from "../Config/Cloudinary.config.js";
import { audioModel } from "../Models/Audio.model.js";


export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorThrow(res, 400, "Please enter all fields");
    }

    if (password.length < 4) {
      return errorThrow(res, 400, "Password must be at least 4 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorThrow(res, 400, "Please enter a valid email");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return errorThrow(res, 409, "Email already registered");
    }

    const user = await UserModel.create({
     
      email,
      password: await hashPassword(password),
    });

    const token = generateToken(res, user._id);
   
    console.log(token)
    return successThrow(res, 200, "User created successfully", {
      user,
 
    });
  } catch (error) {
     
    return errorThrow(res, 500, error.message);
  }
};


export const login = async (req, res) => {
  try {
    const { identifier, pass } = req.body;
    console.log(identifier, pass);

    if (!identifier || !pass) {
      return errorThrow(res, 400, "Please enter email/username and password");
    }

     
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  
    const user = await UserModel.findOne(
      isEmail ? { email: identifier } : { name: identifier }
    );

    if (!user) {
      return errorThrow(res, 400, "Invalid credentials");
    }

    const isMatch = await verifyPassword(pass, user.password);
    if (!isMatch) {
      return errorThrow(res, 400, "Invalid credentials");
    }

    generateToken(res, user._id);
    
    
    let {password , ...rest} = user.toObject()

    return successThrow(res, 200, "User logged in successfully", rest);
  } catch (err) {
    return errorThrow(res, 500, err.message || "Server error");
  }
};


export const logout = async(req,res) =>{
    try{
        res.clearCookie("token")
        return successThrow(res , 200 , "User logged out successfully")
    }catch(err){
        return errorThrow(res , 500 , err.message)
    }
}

export const updateUser = async(req,res) =>{ 
   try {

    if(!req.user){
      return errorThrow(res , 401 , "Unauthorized")
    }
      const {name } = req.body;
       if(!name){
        return errorThrow(res,400,"Please enter name to update")
       }

       let userImage = null;

       if(req.file){

        try {
            const res = await uploadWithCloudinary(req.file.buffer);
        userImage = res.secure_url;
        } catch (error) {
          console.log(error);
          return errorThrow(res , 500 , "Failed to update user image")
        }
      
       }

       let updateduser = await UserModel.findByIdAndUpdate(req.user._id , {
         name : name ? name : req.user.name,
         userImage : userImage ? userImage : req.user.userImage
       },{
        new : true
       })

       return successThrow(res , 200 , "User updated successfully" , updateduser)
   } catch (error) {
    console.log(error)
      return errorThrow(res , 500 , err.message)
   }
}


export const checkingAuth = async(req,res) =>{
  try {
    if(!req.user){
      return errorThrow(res , 401 , "Unauthorized")
    }

    let findUserData = await audioModel.find({user: req.user._id}).sort({createdAt : -1});
    
    let data = {
      user : req.user,
      audioData : findUserData
    }
    return successThrow(res , 200 , "User found" , data)
  } catch (error) {
    console.log(error)
    return errorThrow(res , 500 , error.message)
  }
}