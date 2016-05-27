'use strict';

var Offer = require('../../data/Offer');
var User = require('../../data/User');
var Interest = require('../../data/Interest');
var log = require("../../util/log");
var async = require('async');
var linkingHeader = require('../../util/linkingHeader');
var userGateway = require("../../gateway/sender/user");

module.exports = {
    getMatchedRequests: getMatchedRequests
};

function getMatchedRequests(req, res) {
    var params = req.swagger.params;
    var userId = req.userId;

    var page = params.page.value;
    var per_page = params.per_page.value;

    var conditions = {taker: userId, status: 'ACCEPTED'};

    async.waterfall([
        function (callback) {
            Interest.count(conditions, function (err, count) {
                if (err) {
                    log.error("Error counting accepted matches of user " + userId);
                    callback(err, null);
                }
                callback(null, count);
            });
        }, function (count, callback) {
            Interest.find(conditions).sort({modified: -1}).limit(per_page).skip((page - 1) * per_page).exec(function (err, interests) {
                if (err) {
                    log.error("Error finding accepted matches of user " + userId);
                    callback(err, null);
                }
                callback(null, count, interests);
            });
        }, function (count, interests, callback) {
            var body = [];

            async.each(interests, function (interest, callback) {
                var offerId = interest.offer;
                Offer.findById(offerId, function (err, offer) {
                    if (err) {
                        log.error("Error finding offer with id" + offerId);
                        callback(err);
                    }
                    userGateway.getUserProfile(interest.offerer, function (err, result) {
                        if (err) {
                            log.error("Getting user with id " + interest.offerer);
                            callback(err, null);
                        }
                        body.push({
                            offerId: offerId,
                            offerTitle: offer.title,
                            offerer: {
                                id: interest.offerer,
                                image: result.image,
                                prename: result.prename,
                                surname: result.surname
                            }
                        });
                        callback();
                    });

                });
            }, function (err) {
                if (err) {
                    callback(err)
                }
                callback(null, count, body);
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