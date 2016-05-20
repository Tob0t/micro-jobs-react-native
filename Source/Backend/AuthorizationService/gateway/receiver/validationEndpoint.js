var tokenValidator = require("../../authorization/validation/tokenValidator");

function init(socket, next) {
    //Create endpoint on the gateway
    socket.emit("createEndpoint", "TokenValidation", function (err) {
        if (err) {
            next(err);
            return;
        }
        //If successfully registered endpoint -> initialize endpoint
        initializeEndpoint(socket);
        next();
    });
}

function initializeEndpoint(socket) {
    socket.on("validateAccessToken", function (accessToken, callback) {
        tokenValidator.validate(accessToken, function (err, userId) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(err, userId);
        });
    });
}

module.exports = {
    init: init
};