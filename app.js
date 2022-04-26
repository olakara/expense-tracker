const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('expense-tracker:app');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(morgan('short'));

app.get('/', (req, res) => {

    res.contentType('application/json')
    res.json({ msg: 'Hello from expense tracker' });
});

app.listen(PORT, HOST, () => {
    debug('Listening on port: ' + chalk.green(PORT));
});