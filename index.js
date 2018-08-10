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
require('./startups/prod')(app);

const jwtSecret = config.get('jwtSecret');
if (!jwtSecret) {
    console.error('Jwt Secret not set');
    exit(1);
}
console.log(process.env.MONGODB_URI);
const port = process.env.PORT;
console.log(port);
app.get('/', (req, res) => {
    res.write('welcome to SME');
    res.end();
});

app.listen(port, () => {
    winston.info(`listening on port ${port}... `);
});