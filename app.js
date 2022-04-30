const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app:expense-tracker');
const morgan = require('morgan');
const expenseTrackerRoutes = require('./src/routes/expense-tracker.routes');


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(morgan('short'));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// App status
app.get('/', (req, res) => {
    res.send('ok')
});

// App Routes
app.use('/expenses', expenseTrackerRoutes);


app.listen(PORT, HOST, () => {
    debug('Listening on port: ' + chalk.green(PORT));
});