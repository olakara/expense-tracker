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


    } catch (error) {
        debug(error.stack);
    }
    return ['one', 'two', 'three'];
}

async function getExpenseById(id) {

    return {}
}


module.exports = { getAllExpenses, getExpenseById };