import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title :{
        type : String,
      
    },
    audio :{
        type : String,
         
    },

    originalUrl : {
        type : String,
        required : true
    },

    parsedText : {
        type : String
    },

    

    pastedText : {
        type : String
    }


},{
    timestamps : true
})

export const audioModel = mongoose.model("Audio" , audioSchema)