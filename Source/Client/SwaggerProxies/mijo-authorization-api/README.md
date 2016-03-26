# Installation
```shell
npm install --save <folderToLocalMiJoRepo>/Source/Client/SwaggerProxies/mijo-authorization-api
```

# Usage
var MiJoAuthorizationApi = require('mijo-authorization-api');

//Set the authorization for the APIs -> Just certain clients are allowed to make requests to the api
var apiClient = MiJoAuthorizationApi.ApiClient.instance;
var clientAuthentication = apiClient.authentications['Client Authentication'];
clientAuthentication.username = 'MiJoAndroidClient';
clientAuthentication.password = 'secret';

var tokenApi = new MiJoAuthorizationApi.TokenApi();

var grantType = "password"; // {String} The grant type. Should be password.
var username = "tom.wimmer@hotmail.com"; // {String} The email of the user.
var password = "password"; // {String} The password of the user.
var mijoClientInstanceId = "SomeIdWhichIsUniqueForThisClientInstallation"; // {String} The client instance id which identifies the client of the user.

tokenApi.getKeyPairForUsernameAndPassword(grantType, username, password, mijoClientInstanceId, function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
});