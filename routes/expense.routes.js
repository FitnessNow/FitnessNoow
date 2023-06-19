const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');
const { calculateBalance } = require('../balance/balance');


router.get("/expense", isLoggedIn, (req, res, next) => {

    let amount = req.query.amount;
    let maxAmount = req.query.maxAmount;
    let category = req.query.category;
    let date = req.query.date
    const userDetails = req.session.currentUser;
    amount = Number(amount);
    maxAmount = Number(maxAmount);

    let owner = req.session.currentUser._id;
    
    let filter = {}

    if (amount && maxAmount) {
        filter = {$and: [{amount: {$gte: amount, $lte: maxAmount}}, {owner: owner}]}
    } else if (amount) {
        filter = {$and: [{amount: amount}, {owner: owner}]}
    } else if (maxAmount) {
        filter = {$and: [{amount: {$lte: maxAmount}}, {owner: owner}]}
    } else if (category) {
        filter = {$and: [{category: category}, {owner: owner}]}
    } else if(date) {
        filter = {$and: [{date: date}, {owner: owner}]}
    } else if (owner) {
        filter = {owner: owner}
    }

    calculateBalance(req.session.currentUser._id)
        .then((balance) => {
            Expense.find(filter)
                .then(expenses => {
                    res.render("expense/expense-user", { expenses, balance, filter, userDetails });
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


router.get("/expense/create", isLoggedIn, (req, res, next) => {
    const userDetails = req.session.currentUser;
    Expense.find() 
           .then(createExp => {
                res.render("expense/create-expense", { userDetails })
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
        amount: req.body.amount,
        owner: req.session.currentUser._id
    };

    Expense.create(newExpense)
           .then(newExp => {
            res.redirect("/expense")
           })
           .catch((e) => {
            console.log("failed to create expense", e);
            next(e)
       });
});

router.get("/expense/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    
    const userDetails = req.session.currentUser;

    const updatedExp = {
        date: req.body.date,    
        category: req.body.category,
        amount: req.body.amount
    }

    Expense.findById(id)
           .then(expenseEdit => {
            expenseEdit = expenseEdit.toObject();

            console.log(expenseEdit);
            expenseEdit.date = expenseEdit.date.toISOString().split('T')[0]
            console.log(expenseEdit.date);
            res.render("expense/edit-expense", { expenseEdit, userDetails })
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


router.get("/expense/:expName", (req, res, next) => {
    const userDetails = req.session.currentUser;
    Expense.findOne({category: req.params.expName})
            .then((filter) => {
                res.render("/expense", filter, {userDetails})
            })
            .catch((err) => {
                console.log("error to filter expense", e)
                next(e)
            });
})

module.exports = router;