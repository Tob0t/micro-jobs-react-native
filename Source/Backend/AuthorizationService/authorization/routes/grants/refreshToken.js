var successHandler          = require("../successHandler");
var errorHandler            = require("../errorHandler");
var authorizationContoller  = require("../../controller");
var log                     = require("../../../util/log");

//Required models
var RefreshToken = require("../../models/RefreshToken");

//Required error types
var OAUTH_ERROR = errorHandler.ERROR_TYPES.OAUTH;
var SERVER_ERROR = errorHandler.ERROR_TYPES.SERVER;

/**
 * Handles the refresh_token grant.
 * @param {object} the request object.
 * @param {object} the response object.
 * @param {String} clientInstanceId the client instance id passed in the request.
 */
function handleRefreshTokenGrant(req, res, clientInstanceId){
    log.info("Handle refresh_token grant...");

    var token = req.body.refresh_token;

    if(!token){
        //refresh_token not given in the request
        errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_REQUEST, "Missing refresh token");
        return;
    }

    RefreshToken.findOne({token: token}, function (err, refreshToken){
            if(err){
                log.error("Error finding refresh token " + refreshToken+ ": " + err);
                errorHandler.sendServerError(res, SERVER_ERROR.DATABASE, "Error finding refresh token");
                return;
            }

            if(!refreshToken){
                errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_GRANT, "Invalid refresh token");
                return;
            }

            authorizationContoller.getClientInstanceForRefreshToken(clientInstanceId, refreshToken._id, function(err, clientInstance){
                if(err){
                    errorHandler.sendServerError(res, err.type, err.description);
                    return;
                }

                if(!clientInstance){
                    //The given client instance does not match the one linked to the given refresh token
                    errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_GRANT, "Invalid refresh token");
                    return;
                }

                if(new Date().getTime() > refreshToken.expirationDate){
                    authorizationContoller.removeClientInstance(refreshToken.clientInstanceId, function(err){
                        if(err){
                            errorHandler.sendServerError(res, err.type, err.description);
                        }else{
                            errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_GRANT, "Refresh token expired");
                        }
                    });
                }else{
                    authorizationContoller.refreshClientInstance(refreshToken.clientInstanceId, function(err, accessToken, refreshToken){
                        if(err){
                            errorHandler.sendServerError(res, err.type, err.description);
                        }else{
                            successHandler.sendTokenResponse(res, accessToken, refreshToken);
                        }
                    });
                }
            });
        });
}

module.exports = {
    handle : handleRefreshTokenGrant
};