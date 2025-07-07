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


         // aese bhi kar sakte haii 
        // if(userId === req.user._id.toString()){
        //     return errorThrow(res,400,"You can't send connection request to yourself");
        // }

        // but prototype se khel lete hai

        /* 
         Ruk samjhata hu equals kaise work karta hai under the hood 

         ObjectId.prototype.equals = function (other) {
  return this.toString() === other.toString();
} 

   Basically ye kar wahi raha hai jo hum upar kr rhe haii but thoda cool bn gya haii mongo
        
        */

        if(req.user?._id.equals(userId)){
            return errorThrow(res,400,"You can't send connection request to yourself");
        }

        // Darashal jinaab check kar raha hu vica versa 
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

        const checkIfAccepted = await connectionRequest.findOne({fromUserId : userId , toUserId : req.user._id , status : "accepted"});

        if(checkIfAccepted){
            return errorThrow(res,400,"Request already accepted");
        }

        const checkIfrequested = await connectionRequest.findOne({fromUserId : userId , toUserId : req.user._id , status : "pending"});

        if(!checkIfrequested){
            return errorThrow(res,400,"Request not found");
        }
       

//        let accepted = await connectionRequest.findOneAndUpdate(
//   { fromUserId: userId, toUserId: req.user._id, status: "accepted" },
   
//   { new: true }  
// );

   checkIfrequested.status = "accepted";
   const accepted = await checkIfrequested.save();

   return successThrow(res , 200 , "Request accepted" , accepted)


    } catch (error) {
        console.log(error?.message);
        errorThrow(res,500,"Please try again !")
    }
}

// unfriend after friend
export const unfriend = async(req,res) => {
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

       const checkIfAccepted = await connectionRequest.findOne({
  $or: [
    { fromUserId: userId, toUserId: req.user._id },
    { fromUserId: req.user._id, toUserId: userId }
  ],
  status: "accepted"
});
 

 
if (!checkIfAccepted) {
  return errorThrow(res, 400, "Friendship not found");
}

        await connectionRequest.findOneAndDelete(checkIfAccepted._id);

        return successThrow(res , 200 , "unfriended")


    } catch (error) {
        console.log(error?.message);
        return errorThrow(res,500,"Please try again !")
    }

}

export const getPendingRequest = async(req,res) =>{
    try {
        if(!req.user){
            return errorThrow(res , 401 , "Unauthorized")
        }


        const pendingRequest = await connectionRequest.find({toUserId : req.user._id , status : "pending"}); 

        if(!pendingRequest.length){
            return errorThrow(res,400,"No Pending request!");
        }
         

        return successThrow(res , 200 , "Pending request" , pendingRequest)

    } catch (error) {
        console.log(error)
        return errorThrow(res,500,"Please try again !")
    }
}

export const getAcceptedRequest = async(req,res) =>{ 
    try {
        if(!req.user){
            return errorThrow(res , 401 , "Unauthorized")
        }
        

        let acceptedRequest = await connectionRequest.find({toUserId : req.user._id , status : "accepted"});

        if(!acceptedRequest.length){
            return errorThrow(res,400,"No accepted request!");
        }

        return successThrow(res , 200 , "Accepted request" , acceptedRequest)
    }catch(error){
           console.log(error?.message)
           return errorThrow(res,500,"Please try again later!")
        }

    }