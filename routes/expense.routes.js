const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

const Balance = require('../models/Balance.model');
const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');
const { calculateBalance } = require('../balance/balance');


router.get("/expense", isLoggedIn, (req, res, next) => {
    calculateBalance()
        .then((balance) => {
            Expense.find()
                .then(expenses => {
                    res.render("expense/expense-user", { expenses, balance });
                })
                .catch((e) => {
                    console.log("failed to display expenses", e);
                    next(e);
                });
        })
        .catch((e) => {
            console.log('Failed to calculate balance', e);
            next(e);
        });
});



// router.get("/expense", isLoggedIn, (req, res, next) => {
    
//     Expense.find()
//             .then(expenses => {
//                 res.render("expense/expense-user", { expenses } )
//             })
//             .catch((e) => {
//                 console.log("failed to display expenses", e)
//                 next(e)
//             });
// });

router.get("/expense/create", isLoggedIn, (req, res, next) => {

    Expense.find() 
           .then(createExp => {
                res.render("expense/create-expense")
            })
          .catch((e) => {
               console.log("failed to create expense", e);
                next(e)
           }); 
})

router.post("/expense/create", isLoggedIn, (req, res, next) => {
    const newExpense = {
        date: req.body.date,
        category: req.body.category,
        amount: req.body.amount
    };

    Expense.create(newExpense)
           .then(newExp => {
            res.redirect("/expense")
           })
           .catch((e) => {
            console.log("failed to create expense", e);
            next(e)
       });
})

router.get("/expense/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    const updatedExp = {
        date: req.body.date,    
        category: req.body.category,
        amount: req.body.amount
    }

    Expense.findById(id)
           .then(expenseEdit => {
                res.render("expense/edit-expense", {expenseEdit})
           })
           .catch((e) => {
            console.log("error to edit expense", e)
            next(e)
           });
});

router.post("/expense/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    const updatedExp = {
        date: req.body.date,
        category: req.body.category,
        amount: req.body.amount
    }

    Expense.findByIdAndUpdate(id, updatedExp)
            .then(editExp => {
                res.redirect("/expense")
            })
            .catch((e) => {
                console.log("error to edit expense", e)
                next(e)
               })
})

router.get("/expense/:id/delete", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    Expense.findByIdAndDelete(id)
            .then(() => res.redirect("/expense"))
            .catch((e) => {
                console.log("error to delete expense", e)
                next(e)
               });
});


module.exports = router;