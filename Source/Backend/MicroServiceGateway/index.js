var config = require("./util/config");
var log = require("./util/log");
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var packageJson = require('./package.json');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var port = config.getPort();
server.listen(port, function () {
    log.info(packageJson.name + " running on port " + port);

    //Handles the socket.io connections:
    var endpoints = {};
    io.on("connection", function (socket) {
        log.info("New connection");
        //Create endpoint
        socket.on("createEndpoint", function (endPointName, callback) {
            log.info("Create new endpoint: " + endPointName);
            var endpoint = endpoints[endpoint];
            if (endpoint) {
                //Endpoint already exists
                log.info(endpoint + " already exists");
                callback(new Error(ErrorType.INVALID_ENDPOINT, "Endpoint already exists"));
                return;
            }
            endpoints[endPointName] = socket.id;
            callback(null);
        });

        //Operation - A operation with a callback
        socket.on("operation", function (operationData, callback) {
            var endpointName = operationData.endpoint;
            var endpointSocketId = endpoints[endpointName];
            if (!endpointSocketId) {
                //Endpoint not found
                callback(new Error(ErrorType.UNKNOWN_ENDPOINT, "Unknown endpoint: " + endpointName), null);
                return;
            }

            var operationName = operationData.name;
            if (!operationName) {
                //Operation name not set
                callback(new Error(ErrorType.INVALID_OPERATION, "Operation name not set"), null);
                return;
            }

            var operationData = operationData.data;
            io.sockets.connected[endpointSocketId].emit(operationName, operationData, function (err, result) {
                callback(err, result);
            });
        });

        //Notification - A simple notification without a callback
        socket.on("notification", function (notificationData) {
            var endpointName = notificationData.endpoint;
            var endpointSocketId = endpoints[endpointName];
            if (!endpointSocketId) {
                //Endpoint not found
                callback(new Error(ErrorType.UNKNOWN_ENDPOINT, "Unknown endpoint " + endpointName), null);
                return;
            }

            var notificationName = notificationData.name;
            if (!notificationName) {
                //Operation name not set
                callback(new Error(ErrorType.INVALID_NOTIFICATION, "Notification name not set"), null);
                return;
            }

            var notificationData = notificationData.data;
            io.sockets.connected[endpointSocketId].emit(notificationName, notificationData);
        });

        socket.on('disconnect', function () {
            log.info("Disconnect");

            for (var endPointName in endpoints) {
                if (endpoints[endPointName] === socket.id) {
                    log.info("Deleted endpoint: " + endPointName);
                    delete endpoints[endPointName];
                    break;
                }
            }
        });
    });
});

var ErrorType = {
    INVALID_OPERATION: "InvalidOperation",
    INVALID_NOTIFICATION: "InvalidNotification",
    UNKNOWN_ENDPOINT: "UnknownEndpoint",
    INVALID_ENDPOINT: "InvalidEndpoint"
};

var Error = function (type, message) {
    this.type = type;
    this.message = message;
};