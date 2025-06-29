import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    userImage: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 4,
    },

    audioCredits: {
      type: Number,
      default: 8,
      max: 10,
    },

    coupon: {
      type: String,
      default: "LISTENIFY-VISHAL",

    },

    couponClaimed: {
  type: Boolean,
  default: false,
},

   
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.isNew) {
    if (!this.name) {
      const suffix = Math.random().toString(36).substring(2, 6);
      this.name = `Listenify-${suffix}`;
    }

    if (!this.userImage) {
      const seed = encodeURIComponent(this.name);
      this.userImage = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
    }
  }
  next();
});

export const UserModel = mongoose.model("user", userSchema);
