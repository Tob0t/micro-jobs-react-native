'use strict';

var Offer = require('../../data/Offer');
var log = require("../../util/log");
var async = require('async');
var url = require('url');
var querystring = require('querystring');

module.exports = {
    getOffers: getOffers
};

function getOffers(req, res) {
    var params = req.swagger.params;

    var lon = params.lon.value;
    var lat = params.lat.value;
    var maxDistance = params.max_distance.value;
    var page = params.page.value;
    var per_page = params.per_page.value;
    
    var conditions = {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lon, lat]
                },
                $maxDistance: maxDistance,
            }
        }
    };

    Offer.count(conditions, function (err, count) {
        if (err) {
            log.error("Error counting offers");
            //TODO send server error
            return;
        }
        Offer.find(conditions).limit(per_page).skip((page - 1) * per_page).exec(function (err, offers) {
            if (err) {
                log.error("Error finding offers " + offers);
                //TODO send server error
                return;
            }

            var body = [];

            async.each(offers, function (offer, next) {
                var location = offer.location;
                body.push({
                    title: offer.title,
                    description: offer.description,
                    image: offer.image,
                    location: {
                        lon: location[0],
                        lat: location[1]
                    },
                    deadline: offer.deadline
                });
                next();
            }, function () {
                generateLinkingHeader(req, page, per_page, count, function (linkingHeader) {
                    res.set('Link', linkingHeader);
                    res.json(body);
                });
            })
        });
    });
}

function generateLinkingHeader(req, page, per_page, count, done) {

    function generateLinkingHeaderElement(req, page, rel) {
        //Replace page parameter
        req.query.page = page;

        var urlObject = url.parse(req.url);

        //Add new query string to url
        urlObject.search = '?' + querystring.stringify(req.query);

        return "<" + url.format(urlObject) + ">; rel=" + rel;
    }

    var linkingHeaderElements = [];

    var next = page + 1;
    var prev = page - 1;
    var first = 1;
    var last = count / per_page;

    if (prev > 0) {
        //There is a previous page
        linkingHeaderElements.push(generateLinkingHeaderElement(req, first, "first"));
        linkingHeaderElements.push(generateLinkingHeaderElement(req, prev, "prev"));
    }

    if (next < last) {
        //There is a next page
        linkingHeaderElements.push(generateLinkingHeaderElement(req, next, "next"));
        linkingHeaderElements.push(generateLinkingHeaderElement(req, last, "last"));
    }

    var linkingHeader = "";

    async.forEachOf(linkingHeaderElements, function (element, index, callback) {
        linkingHeader += element
        if (index < linkingHeaderElements.length - 1) {
            linkingHeader += ",";
        }
        callback();
    }, function (err) {
        done(linkingHeader);
    });
}

