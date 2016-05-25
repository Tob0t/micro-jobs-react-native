var io      = require("socket.io-client");
var config  = require("../util/config");

function init(next){
    //Fill the required senders
    var gatewaySenders = [];
    gatewaySenders.push(require("./sender/tokenValidator"));

    //Connect to message gateway
    var messageGatewayUrl = config.getMicroServiceGatewayUrl();
    var socket = io(messageGatewayUrl, {reconnection:false});
    socket.on("connect", function(){
        initSenders(gatewaySenders, gatewaySenders.length - 1, socket, next);
    });
    socket.on("connect_error", function () {
        next("connect_error");
    });
}

function initSenders(senders, startIndex, socket, next){
    if(startIndex < 0){
        next();
        return;
    }
    senders[startIndex].init(socket, function(err){
        if(err){
            next(err);
            return;
        }
        startIndex--;
        initSenders(senders, startIndex, socket, next);
    });
}

module.exports = {
    init: init
}