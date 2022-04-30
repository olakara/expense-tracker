const express = require('express');
const router = express.Router();
const debug = require('debug')('app:expense-tracker:router');
const queryService = require('../services/query-expense.service');
const createService = require('../services/create-expense.service');
const deleteService = require('../services/delete-expense.service');

router.get('/', async (req, res) => {

    const vm = await queryService.getAllExpenses()
    res.json(vm);
});

// Create new expense report
router.post('/', async (req, res) => {

    const expenseDto = {
        title: 'Books',
        amount: 50,
        date: new Date().toLocaleDateString()
    }; //req.body;

    res.json(await createService.createExpense(expenseDto));
});

// Update  expense report
router.put('/:id', async (req, res) => {

});

// Approve/ Reject expense report
router.put('/:id/action', async (req, res) => {

});

// Delete expense report
router.delete('/:id', async (req, res) => {

    const id = req.params.id;
    res.json(await deleteService.deleteExpenseById(id));
});

module.exports = router;