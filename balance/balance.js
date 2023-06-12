
const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');

function calculateBalance() {
    return Promise.all([
        Income.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
        Expense.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }])
    ])
    .then(([incomeTotal, expenseTotal]) => {
        const income = incomeTotal.length > 0 ? incomeTotal[0].total : 0;
        const expense = expenseTotal.length > 0 ? expenseTotal[0].total : 0;
        const balance = income - expense;
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