var messageGatewaySocket;

function init(socket, callback) {
    messageGatewaySocket = socket;
    callback();
}

function getUserProfile(userId, callback) {
    messageGatewaySocket.emit("operation", {
        endpoint: "User",
        name: "getProfile",
        data: userId
    }, function (err, result) {
        callback(err, result)
    });
}

function updateUserProfile(userId, profile, callback) {
    messageGatewaySocket.emit("operation", {
        endpoint: "User",
        name: "updateMiJoUser",
        data: {
            id: userId,
            profile: profile
        }
    }, function (err, result) {
        callback(err, result)
    });
}


module.exports = {
    init: init,
    getUserProfile: getUserProfile,
    updateUserProfile: updateUserProfile
};