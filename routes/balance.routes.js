const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');
const { calculateBalance } = require('../balance/balance');

router.get("/balance", isLoggedIn, (req, res, next) => {
const userDetails = req.session.currentUser;
  calculateBalance(req.session.currentUser._id)
      .then((balance) => {
          res.render("balance/balance-user", { balance, userDetails});
      })
      .catch((e) => {
          console.log('Failed to calculate balance', e);
          next(e);
      });
});

module.exports = router;