//Required dependencies
var https                   = require("https");
var authorizationContoller  = require("../../controller");
var successHandler          = require("../successHandler");
var errorHandler            = require("../errorHandler");
var log                     = require("../../../util/log");

//Required models
var FacebookUser = require("../../models/FacebookUser");

//Required error types
var OAUTH_ERROR = errorHandler.ERROR_TYPES.OAUTH;
var SERVER_ERROR = errorHandler.ERROR_TYPES.SERVER;

var FACEBOOK_OAUTH_ERROR = "OAuthException";

/**
 * Handles the facebook grant.
 * @param {object} the request object.
 * @param {object} the response object.
 * @param {mongoose.Types.ObjectId} clientId the id of the client.
 * @param {String} clientInstanceId the client instance id passed in the request.
 */
function handleFacebookGrant(req, res, clientId, clientInstanceId){
    log.info("Handle facebook grant");

    var fbAccessToken = req.body.fb_access_token;
    if(!fbAccessToken){
        //facebook access token not given in the request
        errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_REQUEST, "Missing facebook access token");
        return;
    }

    verifyFacebookToken(res, fbAccessToken, function(facebookId){
        findOrCreateFacebookUser(res, facebookId, fbAccessToken, function (userId) {
            authorizationContoller.getClientInstanceForUser(clientInstanceId, userId, function(err, clientInstance){
                if(err){
                    errorHandler.sendServerError(res, err.type, err.description);
                    return;
                }
                if(clientInstance){
                    //Refresh existing client instance
                    authorizationContoller.refreshClientInstance(clientInstance._id, function(err, accessToken, refreshToken){
                        if(err){
                            errorHandler.sendServerError(res, err.type, err.description);
                        }else{
                            successHandler.sendTokenResponse(res, accessToken, refreshToken);
                        }
                    });

                }else{
                    //Create new client instance for the given user
                    authorizationContoller.createClientInstance(clientInstanceId, userId, clientId, function(err, accessToken, refreshToken){
                        if(err){
                            errorHandler.sendServerError(res, err.type, err.description);
                        }else{
                            successHandler.sendTokenResponse(res, accessToken, refreshToken);
                        }
                    });
                }
            });
        })

    });
}

function findOrCreateFacebookUser(res, facebookId, fbAccessToken, next){
    FacebookUser.findOne({ facebookId: facebookId }, function(err, facebookUser) {
        if(err) {
            log.error("Error finding Facebook user with facebookId " + facebookId + ": " + err);
            errorHandler.sendServerError(res, SERVER_ERROR.DATABASE, "Error finding FacebookUser");
            return;
        }

        if(facebookUser){
            //Facebook user exists -> update facebook token and refresh client instance
            facebookUser.facebookAccessToken = fbAccessToken;
            facebookUser.save(function (err) {
                if(err){
                    log.error("Error refreshing facebook token for user with id " + facebookUser._id +": " + err);
                    errorHandler.sendServerError(res, SERVER_ERROR.DATABASE, "Error refreshing facebook token for user");
                    return;
                }
                next(facebookUser._id);
            });

        }else{
            //Create new facebook user
            var facebookUser = new FacebookUser({
                facebookId: facebookId,
                facebookAccessToken: fbAccessToken
            });
            facebookUser.save(function(err){
                if(err){
                    log.error("Error creating facebook user with facebook id " + facebookId + ": " + err);
                    errorHandler.sendServerError(res, SERVER_ERROR.DATABASE, "Error creating facebook user");
                    return;
                }
                next(facebookUser._id);
            });
        }
    });
}

function verifyFacebookToken(res, accessToken, next){
    var options = {
        hostname: "graph.facebook.com",
        port: 443,
        path: "/v2.5/me",
        method: 'GET',
        headers: {
            Authorization: "OAuth " + accessToken
        }
    };

    var facebookRequest = https.request(options, function(facebookResponse) {
        facebookResponse.setEncoding('utf8');

        var body = '';
        facebookResponse.on('data', function(d) {
            body += d;
        });
        facebookResponse.on('end', function() {
            var parsedResponse = JSON.parse(body);
            var error = parsedResponse.error;
            if(error){
                //Handle facebook error
                if(error.type == FACEBOOK_OAUTH_ERROR){
                    errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_GRANT, "Invalid facebook access token");
                }else{
                    log.error("Error when checking facebook access token: token = " + accessToken +" / " + " error = "+error) ;
                    errorHandler.sendServerError(res, SERVER_ERROR.GENERAL, "Error checking facebook access token");
                }
            }else{
                //Pass the facebook id to the callback, if no error.
                next(parsedResponse.id);
            }
        });
    });
    facebookRequest.end();
}

module.exports = {
    handle : handleFacebookGrant
};
