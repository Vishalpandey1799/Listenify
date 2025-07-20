import mongoose from "mongoose";

const customAiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
 
  description: {
    type: String,
    required: true,
  },
  targetUsers: {
    type: [String],
  },
  inputType: {
    type: [String],
  },
  outputType: {
    type: [String],
  },
  existingSimilarTools: {
    type: String,
  },
  
}, {
  timestamps: true,
});

export default mongoose.model("CustomAiRequest", customAiSchema);
