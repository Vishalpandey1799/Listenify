import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "unfriended"],
        message: `{VALUE} is not a valid status`,
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
 
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

export const connectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);
