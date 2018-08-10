const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
    mongoose.connect("mongodb://klexzi:kelechi1@ds119072.mlab.com:19072/sme")
        .then(winston.info("connecting to mongodb"));
}