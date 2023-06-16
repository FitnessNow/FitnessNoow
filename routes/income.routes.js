const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');
const { calculateBalance } = require('../balance/balance');


router.get("/income", isLoggedIn, (req, res, next) => {
    const userDetails = req.session.currentUser;
    let amount = req.query.amount;
    amount = Number(amount);

    let owner = req.session.currentUser._id;
    
    let filter = {}

    if(amount) {
        filter = {$and: [{amount: amount}, {owner: owner}]}
    } else if(owner) {
        filter = {owner: owner}
    }

    Promise.all([
        Income.find(filter),
        calculateBalance(req.session.currentUser._id)
    ])
    .then(([income, balance]) => {
        res.render("income/income-user", { income, balance, filter, userDetails });
    })
    .catch((e) => {
        console.log("failed to display income", e);
        next(e);
    });
});


router.get("/income/create", isLoggedIn, (req, res, next) => {
    const userDetails = req.session.currentUser;
    Income.find()
            .then(createInc => {
                res.render("income/create-income", { userDetails })
            })
            .catch((e) => {
                console.log("failed to display create income", e)
                next(e)
            });
});

router.post("/income/create", isLoggedIn, (req, res, next) => {
    const newIncome = {
        date: req.body.date,
        category: req.body.category,
        amount: req.body.amount,
        owner: req.session.currentUser._id
    };

    Income.create(newIncome)
           .then(newInc => {
            res.redirect("/income")
           })
           .catch((e) => {
            console.log("failed to create income", e);
            next(e)
       });
});


router.get("/income/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    const userDetails = req.session.currentUser;

    const updatedInc = {
        date: req.body.date,    
        category: req.body.category,
        amount: req.body.amount
    };

    Income.findById(id)
        .then(incomeEdit => {

            // const formattedDate = incomeEdit.date.toLocaleDateString()
            
            // const dateParts = formattedDate.split('/');
            // const newFormattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            // : {date: newFormattedDate, category: incomeEdit.category, amount: incomeEdit.amount}

            res.render("income/edit-income", { incomeEdit, userDetails })
        })
        .catch((e) => {
            console.log("error to edit income", e)
            next(e)
        });
});

router.post("/income/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    const updatedInc = {
        date: req.body.date,    
        category: req.body.category,
        amount: req.body.amount
    };

    Income.findByIdAndUpdate(id, updatedInc)
        .then(editInc => {
            res.redirect("/income");
        })
        .catch((e) => {
            console.log("error to edit expense", e)
            next(e)
        });
});

router.get("/income/:id/delete", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    Income.findByIdAndDelete(id)
        .then(() => res.redirect("/income"))
        .catch((e) => {
            console.log("error to delete income", e)
            next(e)
           });
});

module.exports = router;