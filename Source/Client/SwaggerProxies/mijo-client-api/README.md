# Installation
```shell
npm install --save <folderToLocalMiJoRepo>/Source/Client/SwaggerProxies/mijo-client-api
```

# Usage
```javascript
var MiJoClientApi = require('mijo-client-api');

//Set the access token
var apiClient = MiJoClientApi.ApiClient.instance;
var clientAuthentication = apiClient.authentications['MiJo API Key'];
clientAuthentication.apiKeyPrefix = "Bearer";
clientAuthentication.apiKey = "2c950ef93bb086beb0d2fb8104be9a26ff3a76de";

//Request for the offer feed
var lat = 48.346371;
var lon=14.510034;
var max_distance=10000;
//This parameters are optional and needed for pagination! --> see swagger spec
var opts = {
    page: 1,
    per_page: 5,
};
var feedApi = new MiJoClientApi.OfferFeedApi();
feedApi.getOffers(lat, lon, max_distance, opts, function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
});
```