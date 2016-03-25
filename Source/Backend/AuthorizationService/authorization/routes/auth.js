//Required dependencies
var express         = require("express");
var basicAuth       = require("basic-auth");
var log             = require("../../util/log");
var errorHandler    = require("./errorHandler");

//Required models
var Client          = require("./../models/Client");
var ClientInstance  = require("./../models/ClientInstance");

//Required routes for different grants
var usernamePasswordRoute   = require("./grants/usernamePassword");
var facebookRoute           = require("./grants/facebook");
var refreshTokenRoute       = require("./grants/refreshToken");

//Required error types
var OAUTH_ERROR = errorHandler.ERROR_TYPES.OAUTH;
var SERVER_ERROR = errorHandler.ERROR_TYPES.SERVER;

//Supported grant types
var USERNAME_PASSWORD_GRANT = "password";
var FACEBOOK_GRANT = "facebook";
var REFRESH_TOKEN_GRANT = "refresh_token";

var tokenRouter = express.Router();

tokenRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//Defines the route for the token request
tokenRouter.post('/', function(req, res) {
    log.info("Checking client_id and client_secret...");
    checkClientIdAndSecret(req, res, function (clientId) {
        log.info("Checking client instance...");
        checkClientInstanceId(req, res, function(clientInstanceId){
                log.info("Checking grant...");
                checkGrant(req, res, function (grantType) {
                    switch(grantType){
                        case USERNAME_PASSWORD_GRANT:
                            usernamePasswordRoute.handle(req, res, clientId, clientInstanceId);
                            break;
                        case FACEBOOK_GRANT:
                            facebookRoute.handle(req, res, clientId, clientInstanceId);
                            break;
                        case REFRESH_TOKEN_GRANT:
                            refreshTokenRoute.handle(req, res, clientInstanceId);
                            break;
                        default:
                            errorHandler.sendOAuthError(res, OAUTH_ERROR.UNSUPPORTED_GRANT_TYPE, "Unsupported grant type");
                            break;
                    }
            });
        })
    });
});

function checkClientIdAndSecret(req, res, next){
    var clientId;
    var clientSecret;

    var clientCredentialsBasicAuth = basicAuth(req);
    if(clientCredentialsBasicAuth){
        //Check the Basic authentication header field for client_id and client_secret
        clientId = clientCredentialsBasicAuth.name;
        clientSecret = clientCredentialsBasicAuth.pass;
    }else{
        //Check the request body for client_id and client_secret
        clientId = req.body.client_id;
        clientSecret = req.body.client_secret;
    }

    if(!clientId || !clientSecret){
        //client_id or client_secret not given in the request
        errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_CLIENT, "No client credentials");
        return;
    }

    //Check if client with the given client_id and client_secret can be found in the database.
    Client.findOne().
        where("clientId").equals(clientId).
        where("clientSecret").equals(clientSecret).
        exec(function (err, client){
            if(err){
                log.error("Error finding client "+clientId);
                errorHandler.sendServerError(res, SERVER_ERROR.DATABASE, "Error finding client");
                return;
            }
            if(!client){
                //Unknown client
                errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_CLIENT, "Unknown client");
                return;
            }
            next(client._id);
        });
}

function checkGrant(req, res, next){
    var grantType = req.body.grant_type;

    if(!grantType){
        errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_GRANT, "Invalid grant");
        return;
    }

    next(grantType);
}

function checkClientInstanceId(req, res, next){
    var clientInstanceId = req.body.mijo_client_instance_id;
    if(!clientInstanceId){
        //No client instance identifier is provided - invalid request.
        errorHandler.sendOAuthError(res, OAUTH_ERROR.INVALID_REQUEST, "Missing client instance id");
        return;
    }

   next(clientInstanceId);
}

function ClientInstanceInfo(identifier){
    this.identifier = identifier;
}

ClientInstanceInfo.prototype.getClientInstanceId  = function(){
    if(this.clientInstanceId){
        return this.clientInstanceId;
    }else{
        return null;
    }
}

ClientInstanceInfo.prototype.getUserId  = function(){
    if(this.userId){
        return this.userId;
    }else{
        return null;
    }
}


module.exports = {
    tokenRoute: tokenRouter
}
