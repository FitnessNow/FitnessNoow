const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

const Income = require('../models/Income.model');


router.get("/income", (req, res, next) => {
    
    Income.find()
            .then(income => {
                res.render("income/income-user", { income });
            })
            .catch((e) => {
                console.log("failed to display income", e)
                next(e)
            });
});

router.get("/income/create", (req, res, next) => {

    Income.find()
            .then(createInc => {
                res.render("income/create-income")
            })
            .catch((e) => {
                console.log("failed to display create income", e)
                next(e)
            });
});

router.post("/income/create", (req, res, next) => {
    const newIncome = {
        date: req.body.date,
        category: req.body.category,
        amount: req.body.amount
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


router.get("/income/:id/edit", (req, res, next) => {
    const { id } = req.params;

    const updatedInc = {
        date: req.body.date,    
        category: req.body.category,
        amount: req.body.amount
    };

    Income.findById(id)
        .then(incomeEdit => {
            res.render("income/edit-income", { incomeEdit })
        })
        .catch((e) => {
            console.log("error to edit expense", e)
            next(e)
        });
});

router.post("/income/:id/edit", (req, res, next) => {
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

router.get("/income/:id/delete", (req, res, next) => {
    const { id } = req.params;

    Income.findByIdAndDelete(id)
        .then(() => res.redirect("/income"))
        .catch((e) => {
            console.log("error to delete income", e)
            next(e)
           });
});

module.exports = router;