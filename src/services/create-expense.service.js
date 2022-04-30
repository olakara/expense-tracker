const express = require('express');
const debug = require('debug')('app:expense-tracker:create-service')
const { getDbContext } = require('../shared/db.service');

async function createExpense(expenseDto) {

    const [db, client] = await getDbContext();

    try {
        const expenseDm = {
            ...expenseDto,
            createdBy: 'SYSTEM',
            isApproved: false,
            isDeleted: false
        };

        const response = await db.collection('expenses').insertOne(expenseDm);
        return response;

    } catch (error) {
        debug(error.stack);
    }
    client.close();
}

module.exports = { createExpense };
