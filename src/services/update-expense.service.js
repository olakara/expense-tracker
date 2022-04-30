const express = require('express');
const debug = require('debug')('app:expense-tracker:query-service');
const mongodb = require('mongodb');

async function updateExpenseById(id) {

    return {}
}

async function approveExpense(id) {

}

async function rejectExpense(id) {

}


module.exports = { updateExpenseById, approveExpense, rejectExpense };