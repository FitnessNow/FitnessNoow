const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

const Balance = require('../models/Balance.model')
const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');
const { calculateBalance } = require('../balance/balance');

router.get("/balance", (req, res, next) => {
  calculateBalance()
      .then((balance) => {
          res.render("balance/balance-user", { balance });
      })
      .catch((e) => {
          console.log('Failed to calculate balance', e);
          next(e);
      });
});





// router.get("/balance", (req, res, next) => {
//       Income.aggregate([{$group: {_id: null, total: {$sum: '$amount'} } }])
//         .then(incomeTotal => {
//           Expense.aggregate([{$group: {_id: null, total: {$sum: '$amount'} } }])
//           .then(expenseTotal => {
//             const income = incomeTotal.length > 0 ? incomeTotal[0].total : 0;
//             const expense = expenseTotal.length > 0 ? expenseTotal[0].total : 0;
//             const balance = income - expense;

//             res.render("balance/balance-user", { balance});
//           })
//           .catch(e => { 
//             console.log('Failed to calculate expense total', e);
//             next(e);
//           });
//         })
//         .catch(e => { 
//           console.log('Failed to calculate expense total', e);
//           next(e);
//         })
// })

module.exports = router;