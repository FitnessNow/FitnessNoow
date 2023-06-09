const {mongoose,Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const exerciseSchema = new Schema(
  {
    category: {
      type: String,
      
    },
    objective: {
      type: String,
      
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  },
);

const Excercise = model("Excercise", exerciseSchema);

module.exports = Excercise;
