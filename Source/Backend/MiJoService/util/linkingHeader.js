var url = require('url');
var querystring = require('querystring');
var async = require('async');

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

module.exports = {
    generate: generateLinkingHeader
}