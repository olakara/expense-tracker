const express = require('express');
const debug = require('debug')('app:expense-tracker:query-service');
const { getDbContext } = require('../shared/db.service');
const { ObjectId } = require('mongodb');


async function getAllExpenses() {

    const [db, client] = await getDbContext();
    try {

        const expenses = await db.collection('expenses').find({ isDeleted: false }).toArray();

        const result = expenses.map((x) => {
            return {
                id: x._id,
                title: x.title,
                amount: x.amount,
                date: x.date,
                isApproved: x.isApproved
            }
        });

        return result;

    } catch (error) {
        debug(error.stack);
    }
    client.close();
}

async function getExpenseById(id) {

    const [db, client] = await getDbContext();

    try {

        const expense = await db.collection('expenses').findOne({ _id: ObjectId(id) });

        const result = {
            id: expense._id,
            title: expense.title,
            amount: expense.amount,
            date: expense.date,
            isApproved: expense.isApproved
        };

        return result;

    } catch (error) {
        debug(error.stack);
    }
    client.close();
}


module.exports = { getAllExpenses, getExpenseById };