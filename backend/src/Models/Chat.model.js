import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],

    lastMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "message"
    }

    // index


},{
    timestamps : true
})

chatSchema.index({participants : 1}, {updatedAt : -1})

export const chat = mongoose.model("Chat" , chatSchema)