const express = require('express');
const debug = require('debug')('app:expense-tracker:query-service');
const { MongoClient } = require('mongodb');

async function getAllExpenses() {

    const url = 'mongodb://localhost:27017';
    const dbName = 'expense-tracker';

    let client;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to the Mongo DB');
        const db = client.db(dbName);

        const expenses = await db.collection('expenses').find({ isDeleted: false }).toArray();

        const result = expenses.map((x) => {
            return {
                _id: x._id,
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

    return {}
}


module.exports = { getAllExpenses, getExpenseById };