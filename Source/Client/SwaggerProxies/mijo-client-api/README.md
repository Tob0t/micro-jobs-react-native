# Installation
```shell
npm install --save <folderToLocalMiJoRepo>/Source/Client/SwaggerProxies/mijo-client-api
```

# Usage
```javascript
var MiJoClientApi = require('mijo-client-api');
var async = require('async'); //Very powerful package for asynchronous program flow patterns

//Set the access token --> must only be done once
var apiClient = MiJoClientApi.ApiClient.instance;
apiClient.basePath = 'http://localhost:8082/api/client/v1'.replace(/\/+$/, '');
var clientAuthentication = apiClient.authentications['MiJo API Key'];
clientAuthentication.apiKeyPrefix = "Bearer";
clientAuthentication.apiKey = "07ee6d1144252ae39074ce8f00a7b43f768f94ed";

/***************FEED***************/
//Request for the offer feed
var lat = 48.346371;
var lon = 14.510034;
var max_distance = 20000;
//This parameters are optional and needed for pagination! --> see swagger spec
var opts = {
    page: 1,
    perPage: 5,
};
var feedApi = new MiJoClientApi.OfferFeedApi();
async.waterfall([
    function (callback) {
        //Get offers
        feedApi.getOffers(lat, lon, max_distance, opts, function (error, data, response) {
            if (error) {
                callback(err, null);
                return;
            }
            //This is the linking header with the pagination information
            console.log(response.headers['link']);
            //if first and prev are returned - there is a previous page
            //if last and next are returned - there is a next page
            //if no linking header is returned at all - just one page
            console.log(data);
            callback(null, data);
        });
    }, function (offers, callback) {
        //Upvote
        feedApi.createUpVote(offers[0].id, function (error, data, response) {
            if (error) {
                callback(err, null);
                return;
            }
            console.log(response.status);
            callback(null, offers);
        });
    }, function (offers, callback) {
        //Downvote
        feedApi.createDownVote(offers[1].id, function (error, data, response) {
            if (error) {
                console.error(error);
                return;
            }
            console.log(response.status);
            callback(null, offers);
        });
    },
], function (err) {
    if (err) {
        console.error("Error: " + err);
        return;
    }
    console.log("test completed");
});
```