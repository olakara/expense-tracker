const express = require('express');
const debug = require('debug')('app:expense-tracker:update-service');
const { getDbContext } = require('../shared/db.service');
const { ObjectId } = require('mongodb');

async function updateExpenseById(expenseDto) {

    const [db, client] = await getDbContext();

    try {
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
                    "isApproved": true,
                    "approvedBy": "SYSTEM"
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
            { $set: { "isDeleted": true } });

    } catch (error) {
        debug(error.stack);
    }
    client.close();

}


module.exports = { updateExpenseById, approveExpense, rejectExpense };