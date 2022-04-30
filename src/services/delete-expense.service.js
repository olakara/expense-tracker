const express = require('express');
const debug = require('debug')('app:expense-tracker:delete-service');
const { getDbContext } = require('../shared/db.service');
const { UserException } = require('../shared/exceptions');
const { ObjectId } = require('mongodb');


async function deleteExpenseById(id) {

    const [db, client] = await getDbContext();
    try {

        const expense = await db.collection('expenses').findOne({ _id: ObjectId(id) });

        if (expense.status === 'APPROVED')
            throw new UserException('Expense request already approved by manager');


        await db.collection('expenses').updateOne({ "_id": ObjectId(id) },
            { $set: { "isDeleted": true } });

    } catch (error) {
        debug(error.message);
        throw error;
    }
    client.close();
}


module.exports = { deleteExpenseById };