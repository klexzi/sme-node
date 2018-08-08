const express = require('express');
const mongoose = require('mongoose');
const joi = require('joi');
const winston = require('winston');
const config = require('config');
const app = express();

app.get('/', (req, res) => {
    res.write('Welcome to SME APP');
    res.end();
})
const port = 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}... `);
});