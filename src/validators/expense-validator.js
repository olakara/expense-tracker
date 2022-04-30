const { check } = require('express-validator');

exports.createExpense = [check('title').trim().not().isEmpty().withMessage('Please provide expense details'),
check('amount').isFloat({ min: 1, max: 2000 }).withMessage('Please provide a valid amount'),
check('date').trim().isDate({ format: 'DD/MM/YYYY' }).withMessage('Please provide a valid date')
];

