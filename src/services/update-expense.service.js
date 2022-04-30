const express = require('express');
const debug = require('debug')('app:expense-tracker:update-service');
const { getDbContext } = require('../shared/db.service');
const { UserException } = require('../shared/exceptions');
const { ObjectId } = require('mongodb');

async function updateExpenseById(expenseDto) {

    const [db, client] = await getDbContext();

    try {

        const expense = await db.collection('expenses').findOne({ _id: ObjectId(id) });

        if (expense.status === 'APPROVED')
            throw new UserException('Approved request cannot be modified');

        if (expense.status === 'REJECT')
            throw new UserException('Rejected request cannot be modified');

        await db.collection('expenses').updateOne({ "_id": ObjectId(expenseDto.id) },
            {
                $set: {
                    "title": expenseDto.title,
                    "amount": expenseDto.amount,
                    "date": expenseDto.date,
                    "updatedBy": "SYSTEM",
                }
            });
        return response;

    } catch (error) {
        debug(error.stack);
    }
    client.close();
}

async function approveExpense(id) {

    const [db, client] = await getDbContext();

    try {

        await db.collection('expenses').updateOne({ "_id": ObjectId(id) },
            {
                $set: {
                    "status": 'APPROVED',
                    "actionBy": "SYSTEM"
                }
            });

    } catch (error) {
        debug(error.stack);
    }
    client.close();

}

async function rejectExpense(id) {

    const [db, client] = await getDbContext();

    try {
        await db.collection('expenses').updateOne({ "_id": ObjectId(id) },
            {
                $set: {
                    "status": 'REJECT',
                    "actionBy": "SYSTEM"
                }
            });

    } catch (error) {
        debug(error.stack);
    }
    client.close();

}


module.exports = { updateExpenseById, approveExpense, rejectExpense };