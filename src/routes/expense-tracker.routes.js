const express = require('express');
const router = express.Router();
const queryService = require('../services/query-expense.service');
const createService = require('../services/create-expense.service');

router.get('/', async (req, res) => {

    const vm = await queryService.getAllExpenses()
    res.json(vm);
});

// Create new expense report
router.post('/', async (req, res) => {
    const expenseDto = {
        title: 'Team outing expenses',
        amount: 1200,
        date: new Date().toLocaleDateString()
    }; //req.body;

    res.json(await createService.createExpense(expenseDto));
});

// Update  expense report
router.put('/:id', (req, res) => {

});

// Approve/ Reject expense report
router.put('/:id/action', (req, res) => {

});

// Delete expense report
router.delete('/:id', (req, res) => {

});

module.exports = router;