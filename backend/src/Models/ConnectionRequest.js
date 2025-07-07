 
import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : String,
        required : true,
    },

    toUserId : {
         type : String,
         required : true,
    },

    status : {
        type : String,
        enum : {
            values : ["pending" , "accepted" , "unfriended"],
            message : `{VALUE} is not valid status`
    }
}



},{
    timestamps : true
})

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
export const connectionRequest = mongoose.model("connectionRequest",connectionRequestSchema);