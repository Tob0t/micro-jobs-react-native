var io = require('socket.io-client');
var config = require("../util/config");

function init(next) {
    //Fill the required receivers
    var gatewayReceivers = [];
    gatewayReceivers.push(require("./receiver/validationEndpoint"));

    //Connect to message gateway
    var messageGatewayUrl = config.getMessageGatewayUrl();
    var socket = io(messageGatewayUrl, {reconnection: false});
    socket.on("connect", function () {
        initReceivers(gatewayReceivers, gatewayReceivers.length - 1, socket, next);
    });
    socket.on("connect_error", function () {
        next("connect_error");
    });
}

function initReceivers(receivers, startIndex, socket, next) {
    if (startIndex < 0) {
        next();
        return;
    }
    receivers[startIndex].init(socket, function (err) {
        if (err) {
            next(err);
            return;
        }
        startIndex--;
        initReceivers(receivers, startIndex, socket, next);
    });
}

module.exports = {
    init: init
}

