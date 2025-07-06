import mongoose from "mongoose";



const qaSchema= new mongoose.Schema({
     question : {
        type : String,
        required : true,
     },

     answer : {
        type : String,
        required : true,
     }
})
const answerSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    
    finalResult : {
        type : [qaSchema],
        required : true
    }
 

    })

export const answerModel = mongoose.model("Answer", answerSchema)