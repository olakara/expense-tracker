const express = require('express');
const debug = require('debug')('app:expense-tracker:query-service');
const { MongoClient, ObjectId } = require('mongodb');

async function deleteExpenseById(id) {

    const url = 'mongodb://localhost:27017';
    const dbName = 'expense-tracker';

    let client;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to the Mongo DB');
        const db = client.db(dbName);

        await db.collection('expenses').updateOne({ "_id": ObjectId(id) },
            { $set: { "isDeleted": true } });

    } catch (error) {
        debug(error.stack);
    }
    client.close();
}


module.exports = { deleteExpenseById };