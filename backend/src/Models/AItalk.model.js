import mongoose from "mongoose";

const aiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userPrompt: {
      type: String,
    },
    aiResponse: {
      type: String,
    },
    audio: {
      type: String,  
    },
    
   
 
  },
  {
    timestamps: true,
  }
);

export const aiModel = mongoose.model("AIMode", aiSchema);
