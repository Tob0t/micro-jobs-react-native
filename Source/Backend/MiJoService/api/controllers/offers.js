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
    getOffer: getOffer,
    getOfferInterests: getOfferInterests,
    createMatch: createMatch,
    declineUserForOffer: declineUserForOffer,
    createOffer: createOffer,
    updateOffer: updateOffer
};

function getOffer(req, res) {
    var params = req.swagger.params;

    var offerId = params.id.value;
    Offer.findOne({_id: offerId}, function (err, offer) {
        if (err) {
            log.error("Error getting offer " + offerId);
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

function getOfferInterests(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var page = params.page.value;
    var per_page = params.per_page.value;

    async.waterfall([
        function (callback) {
            Offer.count({user: userId}, function (err, count) {
                if (err) {
                    log.error("Error counting offers of user " + userId);
                    callback(err, null);
                }
                callback(null, count);
            });
        }, function (count, callback) {
            Offer.find({user: userId}).limit(per_page).skip((page - 1) * per_page).exec(function (err, offers) {
                if (err) {
                    log.error("Error finding offers of user " + userId);
                    callback(err, null);
                }
                callback(null, count, offers);
            });
        }, function (count, offers, callback) {
            var body = {};

            async.each(offers, function (offer, callback) {
                body[offer._id] = {
                    offerId: offer._id,
                    offerTitle: offer.title,
                    offerImage: offer.image,
                    takers: [],
                };

                Interest.find({offer: offer._id}).exec(function (err, interests) {
                    if (err) {
                        log.error("Error finding interests for offer " + offer._id);
                        callback(err, null);
                    }
                    async.each(interests, function (interest, callback) {
                        userGateway.getUserProfile(interest.taker, function (err, result) {
                            if (err) {
                                log.error("Getting user with id " + interest.taker);
                                callback(err, null);
                            }
                            body[offer._id].takers.push({
                                id: interest.taker,
                                status: interest.status,
                                prename: result.prename,
                                surname: result.surname,
                                age: result.age
                            });
                            callback();
                        });
                    }, function (err) {
                        if (err) {
                            callback(err)
                        }
                        callback();
                    });
                });
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