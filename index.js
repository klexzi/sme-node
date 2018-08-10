const express = require('express');
const mongoose = require('mongoose');
const joi = require('joi');
require('express-async-errors');
const winston = require('winston');
const config = require('config');
const app = express();

app.use(express.json());
require('./startups/routes')(app);
require('./startups/db')();
require('./startups/logging')();


const port = 5000;
app.get('/', (req, res) => {
    res.write('welcome to SME');
    res.end();
});

app.listen(port, () => {
    winston.info(`listening on port ${port}... `);
});