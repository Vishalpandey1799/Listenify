import mongoose from "mongoose";

const nativeLanguageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  }
 
});

const programmingLanguageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  }
 
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },

    userImage: { type: String },

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

    bio: {
      type: String,
      default: "Hey What Is Up",
    },

    learningType: {
      type: String,
      enum: {
        values: ["native", "coding"],
        message: `{VALUE} is not a valid learning type`,
      },
    },

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    pending: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

    nativeLanguages: {
      type: [nativeLanguageSchema],
      default: [],
    },

    programmingLanguages: {
      type: [programmingLanguageSchema],
      default: [],
    },

    goal: {
      type: [String],
      default: ["Casual Conversation"],
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

 
userSchema.pre("validate", function (next) {
  if (this.learningType === "native" && (!this.nativeLanguages || this.nativeLanguages.length === 0)) {
    return next(new Error("nativeLanguages must be provided when learningType is 'native'"));
  }

  if (this.learningType === "coding" && (!this.programmingLanguages || this.programmingLanguages.length === 0)) {
    return next(new Error("programmingLanguages must be provided when learningType is 'coding'"));
  }

  next();
});
 
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
