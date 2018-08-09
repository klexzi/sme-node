const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.add(new winston.transports.Console({
        colorize: true,
        prettyPrint: true
    }));
    winston.exceptions.handle(
        new winston.transports.File({
            filename: 'uncaughtexceptions.log',
            level: 'info'
        })
    );
    process.on('unhandledRejection', (ex) => {
        winton.error(ex.message, ex);
        throw ex;
    });

    winston.add(new winston.transports.File({
        filename: 'logs.log',
        level: 'info'
    }));
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/sme_logs'
    }));

}