const {mongoose,Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const incomeSchema = new Schema(
  {
    date: {
      type: Date
    },
    category: {
      type: String,
      required: true,
      enum: ["Salary", "Investment", "Rental", "Gift", "Pension"],
    },
    amount: {
      type: Number,
      required: true
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  },
);

const Income = model("Income", incomeSchema);

module.exports = Income;