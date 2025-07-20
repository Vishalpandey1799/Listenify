
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
    
    
    let {password , coupon , ...rest} = user.toObject()

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

// export const updateUser = async(req,res) =>{ 
//    try {

//     if(!req.user){
//       return errorThrow(res , 401 , "Unauthorized")

//     }

//     console.log(req.body)
//       const {name , learningType , nativeLanguages ,codingLanguages , goal } = req.body;
//       //  if(!name){
//       //   return errorThrow(res,400,"Please enter name to update")
//       //  }




//       console.log(name,learningType,nativeLanguages,codingLanguages,goal)
//        let userImage = null;

//        if(req.file){

//         try {
//             const res = await uploadWithCloudinary(req.file.buffer);
//         userImage = res.secure_url;
//         } catch (error) {
//           console.log(error);
//           return errorThrow(res , 500 , "Failed to update user image")
//         }
      
//        }

//        let updateduser = await UserModel.findByIdAndUpdate(req.user._id , {
//          name : name ? name : req.user.name,
//          userImage : userImage ? userImage : req.user.userImage,
//          learningType : learningType ? learningType : req.user.learningType,
//          nativeLanguages : nativeLanguages ? nativeLanguages : req.user.nativeLanguages,
//          programmingLanguages : codingLanguages ? codingLanguages : req.user.programmingLanguages,
//          goal : goal ? goal : req.user.goal
//        },{
//         new : true
//        })

//        return successThrow(res , 200 , "User updated successfully" , updateduser)
//    } catch (error) {
//     console.log(error)
//       return errorThrow(res , 500 , error.message)
//    }
// }


export const updateUser = async (req, res) => {
  try {
    if (!req.user) {
      return errorThrow(res, 401, "Unauthorized");
    }

    const {
      name,
      learningType,
      nativeLanguages,
      programmingLanguages,
      codingLanguages = programmingLanguages,
      goal,
    } = req.body;

    console.log("Parsed fields:", {
      name,
      learningType,
      nativeLanguages,
      codingLanguages,
      goal,
    });

    let userImage = null;

    if (req.file) {
      try {
        const res = await uploadWithCloudinary(req.file.buffer);
        userImage = res.secure_url;
      } catch (error) {
        console.log(error);
        return errorThrow(res, 500, "Failed to update user image");
      }
    }

    if (learningType && !["native", "coding"].includes(learningType)) {
      return errorThrow(res, 400, "Invalid learning type");
    }
 
    const currentUser = await UserModel.findById(req.user._id);

    const updateData = {
      ...(name && { name }),
      ...(userImage && { userImage }),
      ...(learningType && { learningType }),
      ...(nativeLanguages && { nativeLanguages }),
      ...(codingLanguages && { programmingLanguages: codingLanguages }),
      ...(goal && { goal }),
    };

   
    const isProvidingRequiredFields =
      (nativeLanguages && nativeLanguages.length > 0) ||
      (codingLanguages && codingLanguages.length > 0);

    if (isProvidingRequiredFields && !currentUser.completed) {
      updateData.completed = true;
    }

   

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    );

    return successThrow(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    console.log(error);
    return errorThrow(res, 500, error.message);
  }
};



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



 