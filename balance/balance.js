
const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');

function calculateBalance(userId, date) {
    
    console.log(userId);

    return Promise.all([
        Income.find({owner: userId}),
        Expense.find({owner: userId}),
    ])
    .then(([incomeTotal, expenseTotal]) => {

        const income = incomeTotal.reduce((accl, element) => {
            return accl += element.amount}, 0)
        const expense = expenseTotal.reduce((accl, element) => {
            return accl += element.amount}, 0)
        const balance = income - expense;

        
        console.log(balance);
        return balance;


    })
    .catch((e) => {
        console.log('Failed to calculate balance', e);
        throw e;
    });
}


module.exports = {
    calculateBalance
};
