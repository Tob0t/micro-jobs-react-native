'use strict';

var userGateway = require("../../gateway/sender/user");
var log = require("../../util/log");

module.exports = {
    getUserProfile: getUserProfile,
    updateUserProfile: updateUserProfile
};

function getUserProfile(req, res) {
    userGateway.getUserProfile(req.userId, function (err, result) {
        if (err) {
            log.error("Error fetching user profile: " + err);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.json({
            image: result.image,
            prename: result.prename,
            surname: result.surname,
            age: result.age,
            contactInformation: {
                mail: result.email,
            }
        });
    });
}

function updateUserProfile(req, res) {
    var params = req.swagger.params;
    var profile = params.userProfile.value;
    userGateway.updateUserProfile(req.userId, {
        prename: profile.prename,
        surname: profile.surname,
        image: profile.image,
        age: profile.age,
        email: profile.contactInformation.mail,
        phone: profile.contactInformation.phone
    }, function (err, result) {
        if (err) {
            log.error("Error updating user profile: " + err);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.send();
    });
}