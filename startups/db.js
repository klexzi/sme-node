const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect("mongodb://localhost/sme")
        .then(winston.info("connected to mongodb successfully..."));
}