const {mongoose,Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const expenseSchema = new Schema(
  {
    date: {
      type: Date
    },
    category: {
      type: String,
      required: true,
      enum: ["Home & Utility", "Insurance", "Tax", "Medical", "Child Care", "Education", "Entertainment", "Dine Out"],
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

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
