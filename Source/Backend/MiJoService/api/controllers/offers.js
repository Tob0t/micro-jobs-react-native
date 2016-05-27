'use strict';

var Offer = require('../../data/Offer');
var User = require('../../data/User');
var Interest = require('../../data/Interest');
var log = require("../../util/log");
var async = require('async');
var linkingHeader = require('../../util/linkingHeader');
var object = require('lodash/fp/object');
var userGateway = require("../../gateway/sender/user");

module.exports = {
    getOfferInterests: getOfferInterests,
    createMatch: createMatch,
    declineUserForOffer: declineUserForOffer,
    createOffer: createOffer,
    getOffer: getOffer,
    updateOffer: updateOffer
};

function getOfferInterests(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var page = params.page.value;
    var per_page = params.per_page.value;

    async.waterfall([
        function (callback) {
            Interest.count({offerer: userId}, function (err, count) {
                if (err) {
                    log.error("Error counting interests of user " + userId);
                    callback(err, null);
                }
                callback(null, count);
            });
        }, function (count, callback) {
            Interest.find({offerer: userId}).sort({'offer': -1}).limit(per_page).skip((page - 1) * per_page).exec(function (err, interests) {
                if (err) {
                    log.error("Error finding interests of user " + userId);
                    callback(err, null);
                }
                callback(null, count, interests);
            });
        }, function (count, interests, callback) {
            var body = {};

            function addUser(offerId, userId, status, callback) {
                userGateway.getUserProfile(userId, function (err, result) {
                    if (err) {
                        log.error("Getting user with id " + userId);
                        callback(err, null);
                    }
                    body[offerId].takers.push({
                        id: userId,
                        status: status,
                        image: result.image,
                        prename: result.prename,
                        surname: result.surname
                    });
                    callback();
                });
            }

            async.each(interests, function (interest, callback) {
                var offerId = interest.offer;
                var status = interest.status;
                if (body[offerId]) {
                    addUser(offerId, interest.taker, status, callback);
                } else {
                    Offer.findById(offerId, function (err, offer) {
                        if (err) {
                            log.error("Error finding offer with id" + offerId);
                            callback(err);
                        }
                        body[offerId] = {
                            offerId: offerId,
                            offerTitle: offer.title,
                            takers: [],
                        }
                        addUser(offerId, interest.taker, status, callback);
                    });
                }

            }, function (err) {
                if (err) {
                    callback(err)
                }
                callback(null, count, object.values(body));
            });

        }
    ], function (err, count, body) {
        if (err) {
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        //Generate linking header
        linkingHeader.generate(req, page, per_page, count, function (linkingHeader) {
            if (linkingHeader) {
                res.set('Link', linkingHeader);
            }
            res.json(body);
        });
    });

}
function createMatch(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var offerId = params.offerId.value;
    var matchedUser = params.userId.value;

    async.waterfall([
        function (callback) {
            Interest.findOne({offer: offerId, offerer: userId, taker: matchedUser}, function (err, interest) {
                if (err) {
                    log.error("Error finding interest with id " + offerId);
                    callback(err);
                }
                callback(null, interest);
            });
        },
        function (interest, callback) {
            interest.status = 'ACCEPTED';
            interest.modified = new Date();
            interest.save(function (err) {
                if (err) {
                    log.error("Error updating interest with id " + offerId);
                    callback(err);
                }
                callback(null);
            });
        },
        function (callback) {
            userGateway.getUserProfile(matchedUser, function (err, result) {
                if (err) {
                    log.error("Getting user with id " + matchedUser);
                    callback(err, null);
                }
                callback(null, {
                    mail: result.email,
                    phone: result.phone
                });
            });
        }
    ], function (err, contactInformation) {
        if (err) {
            log.error("Error creating match for offerer: " + userId + "; taker: " + matchedUser + "; offer: " + offerId);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.json(contactInformation);
    });
}
function declineUserForOffer(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var offerId = params.offerId.value;
    var userToDecline = params.userId.value;

    async.waterfall([
        function (callback) {
            Interest.findOne({offer: offerId, offerer: userId, taker: userToDecline}, function (err, interest) {
                if (err) {
                    log.error("Error finding interest with id " + offerId);
                    callback(err);
                }
                callback(null, interest);
            });
        },
        function (interest, callback) {
            interest.status = 'DECLINED';
            interest.modified = new Date();
            interest.save(function (err) {
                if (err) {
                    log.error("Error updating interest with id " + offerId);
                    callback(err);
                }
                callback(null);
            });
        }
    ], function (err) {
        if (err) {
            log.error("Error declining user " + userToDecline + " for offer " + offerId);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.send();
    });
}

function createOffer(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var modelData = getModelData(userId, params);

    Offer.create(modelData, function (err, offer) {
        if (err) {
            log.error("Error creating new offer for user " + userId);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.send();
        User.findByIdAndUpdate(userId, {$push: {"offers": offer._id}}, function (err) {
            if (err) {
                log.error("Error adding offer " + offer._id + " to user " + userId);
                //TODO send error
                res.statusCode = 400;
                res.send("Error");
                return;
            }
            res.send();
        });
    });
}
function getOffer(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var offerId = params.id.value;
    Offer.findOne({_id: offerId, user: userId}, function (err, offer) {
        if (err) {
            log.error("Error getting offer " + offerId + " of user " + userId);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.json({
            title: offer.title,
            description: offer.description,
            image: offer.image,
            location: {
                lon: offer.location[0],
                lat: offer.location[1]
            },
            payment: offer.payment,
            deadline: offer.deadline
        })
    });

}
function updateOffer(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var modelData = getModelData(userId, params);
    var offerId = params.id.value;

    Offer.update({_id: offerId}, modelData, function (err) {
        if (err) {
            log.error("Error updating offer " + offerId + " of user " + userId);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.send();
    });
}

function getModelData(userId, params) {
    var offerData = params.offer.value;
    var title = offerData.title;
    var description = offerData.description;
    var image = offerData.image;
    var location = offerData.location;
    var payment = offerData.payment;
    var deadline = offerData.deadline;

    return {
        user: userId,
        title: title,
        description: description,
        image: image,
        location: [location.lon, location.lat],
        payment: {
            type: payment.type,
            value: payment.value
        },
        deadline: deadline
    };
}