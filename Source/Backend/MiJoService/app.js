'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var config = require("./util/config");
var log = require("./util/log");
var mongoose = require("mongoose");
var packageJson = require('./package.json');
var gatewayConnection = require('./gateway/gatewayConnection');

var swaggerConfig = {
    appRoot: __dirname,
    swaggerSecurityHandlers: {
        'MiJo API Key': function (req, authOrSecDef, scopesOrApiKey, cb) {
            if(!scopesOrApiKey){
                cb(new Error('Unauthorized'));
                return;
            }
            var token = scopesOrApiKey.match("^Bearer (.*)");
            if (!token) {
                cb(new Error('Invalid authorization header'));
                return;
            }
            token = token[1];
            var tokenValidator = require("./gateway/sender/tokenValidator");
            tokenValidator.validateAccessToken(token, function (err, userId) {
                if (err) {
                    log.error("Error validating access token : " + err.toString());
                    cb(new Error('Error validating token'));
                    return;
                }
                if (userId) {
                    req.userId = userId || "5099803df3f4948bd2f98391";
                    cb(false);
                } else {
                    cb(new Error('Invalid token'));
                }
            });
        }
    }
};

SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // install middleware
    swaggerExpress.register(app);

    var port = config.getPort();

    var database = mongoose.connection;
    database.on("open", function (ref) {
        log.info("Connected to database");

        //require('./testData').generate();
        gatewayConnection.init(function (err) {
            if (err) {
                log.error("Connection to message gateway failed: " + err);
                return;
            }
            log.info("Connected to message gateway");
            app.listen(port, function () {
                log.info(packageJson.name + " listen on port " + port);
            });
        });
    });
    database.on("error", function (err) {
        log.error("Could not connect to database");
    });
    mongoose.connect(config.getDatabaseUrl());
});
