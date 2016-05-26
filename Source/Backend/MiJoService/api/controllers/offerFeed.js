'use strict';

var Offer = require('../../data/Offer');
var User = require('../../data/User');
var Interest = require('../../data/Interest');
var log = require("../../util/log");
var async = require('async');
var linkingHeader = require('../../util/linkingHeader');

module.exports = {
    getOffers: getOffers,
    createUpVote: createUpVote,
    createDownVote: createDownVote
};

function getOffers(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var lon = params.lon.value;
    var lat = params.lat.value;
    var maxDistance = params.max_distance.value;
    var page = params.page.value;
    var per_page = params.per_page.value;

    async.waterfall([
        function (callback) {
            //Query skips
            User.findById(userId, function (err, user) {
                if (err) {
                    log.error("Error querying user " + user);
                    callback(err, null);
                }
                callback(null, {
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [lon, lat]
                            },
                            $maxDistance: maxDistance,
                        }
                    },
                    _id: {
                        //Exclude those which has been created or voted by the user
                        $nin: user.skips.concat(user.offers).concat(user.requests)
                    }
                })
            });
        }, function (conditions, callback) {
            //Count amount of offers
            Offer.count(conditions, function (err, count) {
                if (err) {
                    log.error("Error counting offers");
                    callback(err, null);
                }
                callback(null, conditions, count);
            });
        }, function (conditions, count, callback) {
            //Query offers with pagination
            Offer.find(conditions).limit(per_page).skip((page - 1) * per_page).exec(function (err, offers) {
                if (err) {
                    log.error("Error finding offers " + offers);
                    callback(err, null);
                }
                callback(null, count, offers);
            });
        }, function (count, offers, callback) {
            //Parse data
            var body = [];

            async.each(offers, function (offer, next) {
                var location = offer.location;
                body.push({
                    id: offer._id,
                    title: offer.title,
                    description: offer.description,
                    image: offer.image,
                    location: {
                        lon: location[0],
                        lat: location[1]
                    },
                    payment: offer.payment,
                    deadline: offer.deadline
                });
                next();
            }, function () {
                callback(null, count, body)
            })
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
            if(linkingHeader){
                res.set('Link', linkingHeader);
            }
            res.json(body);
        });
    });
}

function createUpVote(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var offerId = params.id.value;

    async.waterfall([
        function (callback) {
            Offer.findById(offerId, function (err, offer) {
                if (err) {
                    log.error("Error querying offer " + offerId);
                    callback(err, null);
                }
                callback(null, offer);
            });
        },
        function (offer, callback) {
            Interest.create({
                offer: offerId,
                offerer: offer.user,
                taker: userId
            }, function (err, interest) {
                if (err) {
                    log.error("Error creating interest " + offerId);
                    callback(err, null);
                }
                callback(null);
            });
        }, function (callback) {
            User.findByIdAndUpdate(userId, {$push: {"requests": offerId}}, function (err) {
                if (err) {
                    log.error("Error updating user requests " + offerId);
                    callback(err, null);
                }
                callback(null);
            });
        }
    ], function (err) {
        if (err) {
            log.error("Error creating upvote of user " + userId + " for offer " + offerId);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.send();
    })
}
function createDownVote(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var offerId = params.id.value;
    User.findByIdAndUpdate(userId, {$push: {"skips": offerId}}, function (err) {
        if (err) {
            log.error("Error creating downvote of user " + userId + " for offer " + offerId);
            //TODO send error
            res.statusCode = 400;
            res.send("Error");
            return;
        }
        res.send();
    });
}

