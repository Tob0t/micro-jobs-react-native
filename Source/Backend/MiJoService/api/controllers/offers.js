'use strict';

var Offer = require('../../data/Offer');
var User = require('../../data/User');
var Interest = require('../../data/Interest');
var log = require("../../util/log");
var async = require('async');
var linkingHeader = require('../../util/linkingHeader');
var object = require('lodash/fp/object');

module.exports = {
    getOfferInterests: getOfferInterests,
    createMatch: createMatch,
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

            function addUser(offerId, userId, callback) {
                //TODO implement
                body[offerId].users.push({
                    id: userId,
                    image: "data:image/png;base64,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",
                    prename: "Prename",
                    surname: "Surname"
                });
                callback();
            }

            async.each(interests, function (interest, callback) {
                var offerId = interest.offer;
                if (body[offerId]) {
                    addUser(offerId, interest.taker, callback);
                } else {
                    Offer.findById(offerId, function (err, offer) {
                        if (err) {
                            log.error("Error finding offer with id" + offerId);
                            callback(err);
                        }
                        body[offerId] = {
                            offerId: offerId,
                            offerTitle: offer.title,
                            users: [],
                        }
                        addUser(offerId, interest.taker, callback);
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
            //TODO get contact information of taker
            callback(null,{
                mail: "somemail@mail.com",
                phone: "00436764714080"
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