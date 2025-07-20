import { connectionRequest } from "../Models/ConnectionRequest.js";
import { UserModel } from "../Models/User.model.js";
import {errorThrow} from "../Utils/Error.js"
import {successThrow} from "../Utils/Success.js"


// Send connection request to the other user
export const sendFriendRequest = async (req, res) => {
   
    try {
        if(!req.user){
            return errorThrow(res , 401 , "Unauthorized")
        
        }

        const {id:userId} = req.params;

        if(!userId){
            return errorThrow(res,400,"Friend Id is required");
        }

        const isExists = await UserModel.findById(userId);


        if(!isExists){
            return errorThrow(res,404,"User not found");
        }


        if(!isExists.completed){
            return errorThrow(res,400,"Onboarding Missed");
        }

        

        if(req.user?._id.equals(userId)){
            return errorThrow(res,400,"You can't send connection request to yourself");
        }


        let checkIfFriends = isExists.friends.some((id) => id._id.equals(req.user._id));

        if(checkIfFriends){
          return errorThrow(res,200,"Already friends");
        }

      
        const checkIfrequested = await connectionRequest.findOne({
            $or: [
                {fromUserId: req.user._id, toUserId: userId},
                {fromUserId: userId, toUserId: req.user._id}
            
            ]
        })

          if(checkIfrequested){
                return errorThrow(res,400,"Request already sent");
            }


        const request = await connectionRequest.create({
            fromUserId : req.user._id,
            toUserId : userId,
            status : "pending"
        })
         
        isExists.status = "pending";
        isExists.save();
        return successThrow(res , 200 , "Request sent" , request)
    } catch (error) {
        console.log(error);
        return errorThrow(res, 500, error.message);
    }
};

// cancel connection request 
export const cancelFriendRequest = async(req,res) => {
    try {
        if(!req.user){
            return errorThrow(res , 401 , "Unauthorized")
        }

        let userId = req.params?.id;

        if(!userId){
            return errorThrow(res,400,"id is required for canceling request");
        }

        const Exists = await UserModel.findById(userId);

        if(!Exists){
            return errorThrow(res,404,"User not found");
        }

        const checkIfrequested = await connectionRequest.findOne({fromUserId : req.user._id , toUserId : userId});

        if(!checkIfrequested){
            return errorThrow(res,400,"Request not found");
        }

        if(checkIfrequested.status !== "pending"){
            return errorThrow(res,400,"Request accepted you can't cancel");
        }

        await connectionRequest.findOneAndDelete({fromUserId : req.user._id , toUserId : userId});

        return successThrow(res , 200 , "Request canceled")


    } catch (error) {
        console.log(error?.message);
        return errorThrow(res,500,"Please try again !")
    }
}


export const rejectFriendRequest = async(req,res) =>{
  try {
    if(!req.user){
        return errorThrow(res , 401 , "Unauthorized")
    }

    const userId = req.params?.id;

    if(!userId){
        return errorThrow(res,400,"id is required for accepting request");
    }

    const Exists = await UserModel.findById(userId);

    if(!Exists){
        return errorThrow(res,404,"User not found");
    }

    const checkIfAccepted = await connectionRequest.findOne({fromUserId : userId , toUserId : req.user._id , status : "pending"});

    if(!checkIfAccepted){
        return errorThrow(res,400,"Request not found");
    }

    await connectionRequest.findOneAndDelete({fromUserId : userId , toUserId : req.user._id , status : "pending"});

    return successThrow(res , 200 , "Request rejected")
  } catch (error) {
     console.log(error?.message);
  }
}

// accept friend request
export const acceptFriendRequest = async(req,res) =>{
    try {
        if(!req.user){
            return errorThrow(res , 401 , "Unauthorized")
        }

        const userId = req.params?.id;

        if(!userId){
            return errorThrow(res,400,"id is required for accepting request");
        }

        const Exists = await UserModel.findById(userId);

        if(!Exists){
            return errorThrow(res,404,"User not found");
        }
        if(!Exists.completed){
            return errorThrow(res,404,"Onboarding Missed");
        }

        const checkIfAccepted = await connectionRequest.findOne({fromUserId : userId , toUserId : req.user._id , status : "accepted"});

        if(checkIfAccepted){
            return errorThrow(res,400,"Request already accepted");
        }

        const checkIfrequested = await connectionRequest.findOne({fromUserId : userId , toUserId : req.user._id , status : "pending"});

        if(!checkIfrequested){
            return errorThrow(res,400,"Request not found");
        }
       

 

   checkIfrequested.status = "accepted";
   const accepted = await checkIfrequested.save();

     
    await Promise.all([
      UserModel.updateOne(
        { _id: req.user._id },
        { $addToSet: { friends: userId } }
      ),
      UserModel.updateOne(
        { _id: userId },
        { $addToSet: { friends: req.user._id } }
      ),
    ]);

    // so we are updating both user 
    await Promise.all([
      UserModel.updateOne(
        { _id: req.user._id },
        {status : "accepted" }
      ),
      UserModel.updateOne(
        { _id: userId },
        { status : "accepted" }
      ),
    ]);

   return successThrow(res , 200 , "Request accepted" , accepted)


    } catch (error) {
        console.log(error?.message);
        errorThrow(res,500,"Please try again !")
    }
}

 
export const unfriend = async (req, res) => {
  try {
    if (!req.user) {
      return errorThrow(res, 401, "Unauthorized");
    }

    const userId = req.params?.id;
    if (!userId) {
      return errorThrow(res, 400, "id is required");
    }

    
    const otherUser = await UserModel.findById(userId).lean();
    if (!otherUser) {
      return errorThrow(res, 404, "User not found");
    }

    
    const friendship = await connectionRequest.findOne({
      $or: [
        { fromUserId: userId,    toUserId: req.user._id },
        { fromUserId: req.user._id, toUserId: userId }
      ],
      status: "accepted"
    });

    if (!friendship) {
      return errorThrow(res, 400, "Friendship not found");
    }
 

   
    await connectionRequest.findOneAndDelete({ _id: friendship._id });

    
    await Promise.all([
      UserModel.updateOne(
        { _id: req.user._id },
        { $pull: { friends: userId } }
      ),
      UserModel.updateOne(
        { _id: userId },
        { $pull: { friends: req.user._id } }
      )
    ]);
    await Promise.all([
      UserModel.updateOne(
        { _id: req.user._id },
        { status : "none" }
      ),
      UserModel.updateOne(
        { _id: userId },
        { status: "none" }
      )
    ]);

    return successThrow(res, 200, "Unfriended");
  } catch (error) {
    console.error(error?.message);
    return errorThrow(res, 500, "Please try again!");
  }
};


export const getPendingRequest = async (req, res) => {
  try {
    if (!req.user) {
      return errorThrow(res, 401, "Unauthorized");
    }

    const pendingRequest = await connectionRequest
      .find({ toUserId: req.user._id, status: "pending" })
      .populate({
        path: "fromUserId",
        select: "name userImage email",  
      })
      .lean();


     console.log(pendingRequest);

    if (!pendingRequest.length) {
      return errorThrow(res, 400, "No pending requests!");
    }

    let clearData = pendingRequest.map((item) => {
      return {
     
        fromUserId: item.fromUserId,
      };
    });

    return successThrow(res, 200, "Pending request", clearData);
  } catch (error) {
    console.log(error);
    return errorThrow(res, 500, "Please try again!");
  }
};


export const getFriends = async (req, res) => {
  try {
    if (!req.user) {
      return errorThrow(res, 401, "Unauthorized");
    }
 
    const user = await UserModel
      .findById(req.user._id)
      .select("friends")                       
      .populate({
        path: "friends",
        select: "name userImage email nativeLanguages programmingLanguages learningType", 
      })
      .lean();  

    if (!user || !user.friends?.length) {
      return errorThrow(res, 400, "No friends found");
    }
   
    
    return successThrow(res, 200, "Fetched Friends", user.friends);
  } catch (error) {
    console.log(error?.message);
    return errorThrow(res, 500, "Please try again later!");
  }
};


// export const getAllusers = async (req, res) => {
//   if (!req.user) {
//     return errorThrow(res, 401, "Unauthorized");
//   }

//   try {
//     const currentUserId = req.user._id;
 
//     const currentUser = await UserModel.findById(currentUserId).select("friends").lean();
//     const friendsList = currentUser?.friends?.map(id => id.toString()) || [];

 
//     const allUsers = await UserModel.find({
//       completed: true,
//       _id: { $ne: currentUserId, $nin: friendsList },
//     })
//       .select("name userImage email nativeLanguages programmingLanguages status")
//       .lean();

//     if (!allUsers.length) {
//       return errorThrow(res, 400, "No users found");
//     }

//     return successThrow(res, 200, "Fetched all users", allUsers);
//   } catch (e) {
//     console.error("GetAllUsers error:", e);
//     return errorThrow(res, 500, "Server error");
//   }
// };


export const getAllUsers = async (req, res) => {
  if (!req.user) {
    return errorThrow(res, 401, "Unauthorized");
  }

  try {
    const currentUserId = req.user._id;

    // 1. Get current user's friends list
    const currentUser = await UserModel.findById(currentUserId)
      .select("friends")
      .lean();
    const friendsList = currentUser?.friends?.map(id => id.toString()) || [];

    
    const allUsers = await UserModel.find({
      completed: true,
      _id: { $ne: currentUserId, $nin: friendsList },
    })
      .select("name userImage email nativeLanguages programmingLanguages learningType ")
      .lean();

    if (!allUsers.length) {
      return errorThrow(res, 400, "No users found");
    }

    
    const usersWithConnectionStatus = await Promise.all(
      allUsers.map(async (user) => {
        const connection = await connectionRequest.findOne({
          $or: [
            { fromUserId: currentUserId, toUserId: user._id },
            { fromUserId: user._id, toUserId: currentUserId },
          ],
        });

        return {
          ...user,
          connectionStatus: connection ? connection.status : null,
         
       
        };
      })
    );

    return successThrow(
      res,
      200,
      "Fetched all users",
      usersWithConnectionStatus
    );
  } catch (e) {
    console.error("GetAllUsers error:", e);
    return errorThrow(res, 500, "Server error");
  }
};