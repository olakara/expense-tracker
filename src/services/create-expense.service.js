const express = require('express');
const debug = require('debug')('app:expense-tracker:create-service')
const { MongoClient } = require('mongodb');

async function createExpense(expenseDto) {

    const url = 'mongodb://localhost:27017';
    const dbName = 'expense-tracker';

    let client;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to the Mongo DB');
        const db = client.db(dbName);

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

}

module.exports = { createExpense };
