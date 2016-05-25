var winston = require('winston');
var dailyRotateFileTransport = require('winston-daily-rotate-file');
var config = require("./config");
var packageJson = require('../package.json');

var logPath = config.getLogDirectory() + "\\" + packageJson.name;

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
        new (dailyRotateFileTransport)({
            name: "error-file",
            level: "error",
            timestamp: true,
            filename: logPath + "error.log",
            datePattern: ".yyyy-MM-dd-HH",
            handleExceptions: true,
            humanReadableUnhandledException: true
        }),
    ]
});

module.exports = logger;