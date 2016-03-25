var log             = require("../../util/log");
var AccessToken     = require("../models/AccessToken");
var ClientInstance  = require("../models/ClientInstance");


//Server errors
var ValidationErrorType = {
    GENERAL: "general",
    DATABASE: "database"
};


function ValidationError(type, message){
    this.type = type;
    this.message = message;
}

ValidationError.prototype.getMessage = function(){
    return this.message;
}

ValidationError.prototype.getType = function(){
    return this.type;
}

function validate(accessToken, next){
    if(!accessToken){
        next(new ValidationError(ValidationErrorType.GENERAL, "access token undefined"));
        return;
    }

    AccessToken.findOne({token: accessToken}, function(err, token){
        if(err){
            log.error("Error finding access token " + accessToken + " :" + err);
            next(new ValidationError(ValidationErrorType.DATABASE, "Error finding access token"));
            return;
        }

        if(!token){
            //Access token not found
            next(null, null);
            return;
        }

        var clientInstanceId = token.clientInstanceId;
        if(!clientInstanceId){
            log.error("Access token with id" + token._id + "has no reference to a client instance");
            next(new ValidationError(ValidationErrorType.GENERAL, "Access token has to reference to a client id"));
            return;
        }

        ClientInstance.findById(clientInstanceId, function(err, clientInstance){
            if(err){
                log.error("Error finding client instance with id " + clientInstanceId + " :" + err);
                next(new ValidationError(ValidationErrorType.DATABASE, "Error finding client instance"));
                return;
            }

            var userId = clientInstance.userId;

            if(!userId){
                log.error("Client instance with id " + clientInstanceId + "has no reference to a user");
                next(new ValidationError(ValidationErrorType.GENERAL, "Client instance has no reference to a user"));
                return;
            }

            //Check if access token is expired
            if(new Date().getTime() > token.expirationDate) {
                //Access token expired, return false
                log.info("Access token expired " + token);
                next(null, null);
            }else{
                next(null, userId.toString());
            }
        });
    });
}

module.exports = {
    validate : validate
};