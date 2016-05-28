var https = require("https");
var log = require("../../util/log");
var User = require("../../data/User");
var FacebookUser = require("../../data/FacebookUser");
var MiJoUser = require("../../data/MiJoUser");

function init(socket, next) {
    socket.emit("createEndpoint", "User", function (err) {
        if (err) {
            next(err);
            return;
        }
        initializeEndpoint(socket);
        next();
    });
}

//Server errors
var USER_ENDPOINT_ERROR = {
    GENERAL: "general",
    DATABASE: "database"
};


function UserEndpointError(error, error_description) {
    this.error = error;
    this.error_description = error_description;
}

function initializeEndpoint(socket) {
    socket.on("getProfile", function (userId, callback) {
        User.findById(userId, function (err, user) {
            if (err) {
                log.error("Error getting user with id " + userId + " :" + err);
                callback(new UserEndpointError(USER_ENDPOINT_ERROR.DATABASE, "Error getting user"));
                return;
            }

            if (!user) {
                log.error("Cannot find user with id " + userId);
                callback(new UserEndpointError(USER_ENDPOINT_ERROR.GENERAL, "Cannot find user with given id"));
                return;
            }

            if (user instanceof MiJoUser) {
                getMiJoUser(user, callback);
            } else if (user instanceof FacebookUser) {
                getFacebookUser(user, callback);
            } else {
                log.error("Unsupported user type: " + user);
                callback(new UserEndpointError(USER_ENDPOINT_ERROR.GENERAL, "Unsupported user type"));
            }
        })
    });
    socket.on("updateMiJoUser", function (user, callback) {
        var userProfile = user.profile;
        MiJoUser.update({_id: user.id}, {
            profile: {
                prename: userProfile.prename,
                surname: userProfile.surname,
                image: userProfile.image
            },
            email: userProfile.email,
            age: userProfile.age
        }, function (err) {
            if (err) {
                log.error("Error updating MiJo user " + user.id);
                callback(new UserEndpointError(USER_ENDPOINT_ERROR.GENERAL, "Error updating MiJo user"))
                return;
            }
            callback();
        });
    });
}

function getMiJoUser(mijoUser, callback) {
    var userProfile = mijoUser.profile;
    sendUserData(userProfile.prename, userProfile.surname, userProfile.isMale, userProfile.image, mijoUser.email, mijoUser.age, callback);
}

function getFacebookUser(facebookUser, callback) {
    var options = {
        hostname: "graph.facebook.com",
        port: 443,
        path: "/v2.5/me?fields=id,first_name,last_name,gender,picture",
        method: 'GET',
        headers: {
            Authorization: "OAuth " + facebookUser.facebookAccessToken
        }
    };

    var facebookRequest = https.request(options, function (facebookResponse) {
        facebookResponse.setEncoding("utf8");

        var body = "";
        facebookResponse.on("data", function (d) {
            body += d;
        });
        facebookResponse.on("end", function () {
            var facebookResponse = JSON.parse(body);
            var error = facebookResponse.error;
            if (error) {
                log.error("Error fetching user information from facebook for user " + facebookUser._id + ": " + error);
                callback(new UserEndpointError(USER_ENDPOINT_ERROR.GENERAL, "Error fetching user information from facebook"));
            } else {
                //Get facebook image
                var imageUrl = facebookResponse.picture.data.url;
                https.get(imageUrl, function (facebookImageResponse) {
                    facebookImageResponse.setEncoding("binary");

                    var body = "";
                    var type = facebookImageResponse.headers["content-type"];
                    var prefix = "data:" + type + ";base64,";

                    facebookImageResponse.on("data", function (d) {
                        body += d;
                    });
                    facebookImageResponse.on("end", function () {
                        var base64 = new Buffer(body, "binary").toString("base64");
                        var facebookImageBase64 = prefix + base64;

                        var isMale = false;
                        if (facebookResponse.gender === "male") {
                            isMale = true;
                        }
                        sendUserData(facebookResponse.first_name, facebookResponse.last_name, isMale, facebookImageBase64, callback);
                    });
                });
            }
        });
    });
    facebookRequest.end();
}

function sendUserData(prename, surname, isMale, image, email, age, callback) {
    callback(null, {
        prename: prename,
        surname: surname,
        isMale: isMale,
        image: image,
        email: email,
        age: age
    });
}

module.exports = {
    init: init
};