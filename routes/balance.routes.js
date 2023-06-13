const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');
const { calculateBalance } = require('../balance/balance');

router.get("/balance", (req, res, next) => {
  calculateBalance(req.session.currentUser._id)
      .then((balance) => {
          res.render("balance/balance-user", { balance });
      })
      .catch((e) => {
          console.log('Failed to calculate balance', e);
          next(e);
      });
});

module.exports = router;