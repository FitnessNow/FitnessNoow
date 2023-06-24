
const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');

function calculateBalance(userId) {
    
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

async function balanceUntilDate(date, userId) {

    try {
        const incomes = await Income.find({owner: userId, date: {$lte: date} })
        const expense = await Expense.find({owner: userId, date: {$lte: date} })
        let totalIncome = 0 
        incomes.forEach((current)=> {
            totalIncome += current.amount
        })

        let totalExpense = 0
        console.log("INCOMES>>>>",expense)
        expense.forEach((current)=> {
            totalExpense += current.amount
        })

        // console.log(totalExpense, "+", totalIncome, "give me the number");
        const totalExpInc = totalIncome - totalExpense
        return totalExpInc

    } catch (error) {
        console.log(error);
        throw `Error getting balance until ${date}`
    }
}



module.exports = {
    calculateBalance,
    balanceUntilDate
};
