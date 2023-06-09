const { mongoose, Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      enum: ["Beginner", "Intermediate", "Advanced", "Pro",],
      required: true,
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      enum: ["Lose Weight", "Build Muscle", "Be Active"],
      required: true,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
