const {mongoose,Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const exerciseSchema = new Schema(
  {
    category: {
      type: mongoose.Schema.Types.level,
      ref: "User"
    },
    objective: {
      type: mongoose.Schema.Types.goal,
      ref: "User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  },
);

const Excercise = model("Excercise", exerciseSchema);

module.exports = Excercise;
