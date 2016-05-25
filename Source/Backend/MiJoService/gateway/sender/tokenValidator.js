var messageGatewaySocket;

function init(socket, callback) {
    messageGatewaySocket = socket;
    callback();
}

function validateAccessToken(token, callback) {
    messageGatewaySocket.emit("operation", {
        endpoint: "TokenValidation",
        name: "validateAccessToken",
        data: token
    }, function (err, result) {
        callback(err, result)
    });
}


module.exports = {
    init: init,
    validateAccessToken: validateAccessToken
};