var config = require("./util/config");
var log = require("./util/log");
var mongoose = require("mongoose");
var gatewayConnection = require("./gateway/gatewayConnection");
var packageJson = require('./package.json');

var database = mongoose.connection;
database.on("open", function (ref) {
    log.info("Connected to database");
    gatewayConnection.init(function (err) {
        if (err) {
            log.error("Connection to message gateway failed: " + err);
            return;
        }
        log.info(packageJson.name + " connected to message gateway");
    });
});
database.on("error", function (err) {
    log.error("Could not connect to database");
});
mongoose.connect(config.getDatabaseUrl());