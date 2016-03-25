//Required dependencies
var bcrypt                  = require("bcrypt");
var authorizationContoller  = require("../../controller");
var successHandler          = require("../successHandler");
var errorHandler            = require("../errorHandler");
var log                     = require("../../../util/log");

//Required models
var ProwoUser = require("../../models/ProwoUser");

//Required error types
var OAUTH_ERROR = errorHandler.ERROR_TYPES.OAUTH;
var SERVER_ERROR = errorHandler.ERROR_TYPES.SERVER;

/**
 * Handles the username password grant.
 * @param {object} req the request object.
 * @param {object} res the response object.
 * @param {mongoose.Types.ObjectId} clientId the id of the client.
 * @param {String} clientInstanceId the client instance id passed in the request.
 */
function handleUsernamePasswordGrant(req, res, clientId, clientInstanceId){
    log.info("Handle password grant...");

    var email = req.body.username;
    if(!email){
        //username not given in the request
        errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_REQUEST, "Missing username");
        return;
    }
    var password = req.body.password;
    if(!password){
        //password not given in the request
        errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_REQUEST, "Missing password");
        return;
    }

    ProwoUser.findOne({ email: email }, function(err, user) {
        if (err) {
            log.error("Error finding ProwoUser with email"+email);
            errorHandler.sendServerError(res, SERVER_ERROR.DATABASE, "Error finding ProwoUser");
            return;
        }
        if(!user) {
            //User not found
            errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_GRANT, "Invalid resource owner credentials");
            return;
        }
        bcrypt.compare(password, user.password, function (err, correctPassword) {
            if (err) {
                errorHandler.sendServerError(res, SERVER_ERROR.GENERAL, "Error comparing password hashes");
                return;
            }
            if(!correctPassword) {
                //Incorrect password
                errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_GRANT, "Invalid resource owner credentials");
                return;
            }

            authorizationContoller.getClientInstanceForUser(clientInstanceId, user._id, function(err, clientInstance){
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
                    authorizationContoller.createClientInstance(clientInstanceId, user._id, clientId, function(err, accessToken, refreshToken){
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

module.exports = {
    handle : handleUsernamePasswordGrant
};