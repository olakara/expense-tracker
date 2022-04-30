const express = require('express');
const debug = require('debug')('app:expense-tracker:delete-service');
const { getDbContext } = require('../shared/db.service');


async function deleteExpenseById(id) {

    const [db, client] = await getDbContext();
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