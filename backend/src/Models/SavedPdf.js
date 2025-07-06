import mongoose from "mongoose";

const savedPdfSchema = new mongoose.Schema({
     user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
     },

     pdfUrl : {
        type : String,
       
     }
    
},{
    timestamps : true
})

export const pdfModel = mongoose.model("SavingPdf" , savedPdfSchema);