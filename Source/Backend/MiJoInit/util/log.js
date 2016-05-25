var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            name: "info-console",
            level: "debug",
            timestamp: true,
            colorize: true,
            handleExceptions: true,
            humanReadableUnhandledException: true
        }),
    ]
});

module.exports = logger;