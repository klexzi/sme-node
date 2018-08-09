const express = require('express');
const mongoose = require('mongoose');
const joi = require('joi');
require('express-async-errors');
const winston = require('winston');
const config = require('config');
const app = express();
require('./startups/routes')(app);
require('./startups/db')();
require('./startups/logging')();


app.use(express.json());
const port = 5000;
app.get('/', (req, res) => {
    res.write('welcome to SME');
});

app.listen(port, () => {
    winston.info(`listening on port ${port}... `);
});