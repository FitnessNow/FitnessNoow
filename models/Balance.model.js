const {mongoose, Schema, model } = require("mongoose");

const balanceSchema = {
  income: {
    type: Number,
    required: true
  },
  expense: {
    type: Number,
    required: true
  },
}


const Balance = model("Balance", balanceSchema);

module.exports = Balance;