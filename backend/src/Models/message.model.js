import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    
    chatId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chat",
        required : true,
        index : true
    
    },

    senderId : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "user",
         required : true
    },

    text : String,

    messageType : {
        type : String,
        enum : ["text" , "image" , "video" , "file"],
        default : "text"
    },

    mediaUrl : String,

    isEdited : {
          type : Boolean,
          default : false
    },

    deletedFor: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref : "user",
         required : true
       }
    ],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},{
    timestamps : true
})

export const messageModel = mongoose.model("message" , messageSchema)