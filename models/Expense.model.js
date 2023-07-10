const { mongoose, Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const expenseSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
