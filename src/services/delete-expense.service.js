const express = require('express');
const debug = require('debug')('app:expense-tracker:query-service');
const mongodb = require('mongodb');

async function deleteExpenseById(id) {

    return {}
}


module.exports = { deleteExpenseById };