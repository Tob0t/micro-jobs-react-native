//Required dependencies
var mongoose    = require("mongoose");
var crypto      = require('crypto');
var config      = require("../util/config");
var log         = require("../util/log");

//Required models
var AccessToken     = require("./models/AccessToken");
var RefreshToken    = require("./models/RefreshToken");
var ClientInstance  = require("./models/ClientInstance");
var User            = require("./models/User");

//Required errors
var DATABASE_ERROR = require("./routes/errorHandler").ERROR_TYPES.SERVER.DATABASE;

/**
 * Callback which returns a client instance.
 *
 * @callback ClientInstanceCallback
 * @param {object} err set if an error occurred, {@code null} otherwise.
 * @param {object} clientInstance the client instance, or {@code null} if not found or an error occurred.
 */

/**
 * Get a client instance.
 * @param identifier the identifier which identifies the client instance in behalf of the user.
 * @param {mongoose.Types.ObjectId} userId the id of the user to get the client instance for.
 * @param {ClientInstanceCallback} next the callback which returns the client instance.
 */
function getClientInstanceForUser(identifier, userId, next){
    ClientInstance.findOne({identifier : identifier, userId: userId}, function (err, clientInstance){
            if (err) {
                next(new Error(DATABASE_ERROR, "Error finding client instance"), null);
                return;
            }
            if(clientInstance){
                next(null, clientInstance);
            }else{
                next(null, null);
            }
        });
}

/**
 * Get a client instance.
 * @param identifier the identifier which identifies the client instance in behalf of the user.
 * @param {mongoose.Types.ObjectId} refreshTokenId the id of the refresh token to get the client instance for.
 * @param {ClientInstanceCallback} next the callback which returns the client instance.
 */
function getClientInstanceForRefreshToken(identifier, refreshTokenId, next){
    ClientInstance.findOne({identifier : identifier, refresh_token: refreshTokenId}, function (err, clientInstance){
        if (err) {
            next(new Error(DATABASE_ERROR, "Error finding client instance"), null);
            return;
        }
        if(clientInstance){
            next(null, clientInstance);
        }else{
            next(null, null);
        }
    });
}

/**
 * Callback which returns an access token and refresh token.
 *
 * @callback AccessTokenCallback
 * @param {object} err set if an error occurred, {@code null} otherwise.
 * @param {AccessToken} the access token, or {@code null} if an error occurred.
 * @param {RefreshTken} the refresh token, or {@code null} if an error occurred.
 */

/**
 * Creates a new client instance.
 * @param {string} identifier the identifier for the new client instance.
 * @param {mongoose.Types.ObjectId} userId the id of the user where the client instance belongs to.
 * @param {mongoose.Types.ObjectId} clientId the id of the client where the client instance belongs to.
 * @param {AccessTokenCallback} next the callback which returns the new access token and refresh token.
 */
function createClientInstance(identifier, userId, clientId, next){
    log.info("Creating new client instance for user " + userId +" ...");
    var id = mongoose.Types.ObjectId();

    generateNewTokens(id, function(err, accessToken, refreshToken){
        if(err){
            next(err, null, null);
            return;
        }

        var clientInstance = new ClientInstance({
            _id: id,
            userId: userId,
            clientId: clientId,
            identifier: identifier,
            access_token: accessToken._id,
            refresh_token: refreshToken._id
        });
        clientInstance.save(function(err){
            if(err){
                log.error("Error saving client instance for user " + userId + ": " + err);
                next(new Error(DATABASE_ERROR, "Error saving client instance"), null, null);
                return;
            }
            //Link the client instance to the user
            User.update({ _id: userId }, { $addToSet: { clientInstances: id } }, function(err) {
                    if(err){
                        log.error("Error updating client instances for user " + userId + ": " + err);
                        next(new Error(DATABASE_ERROR, "Error updating client instances for user"), null, null);
                        return;
                    }
                    next(null, accessToken.token, refreshToken.token);
                }
            );
        });
    });
}

/**
 * Refresh an existing client instance.
 * @param {mongoose.Types.ObjectId} clieclientInstanceIdntId the id of the client instance to refresh.
 * @param {AccessTokenCallback} next the callback which returns the new access token and refresh token.
 */
function refreshClientInstance(clientInstanceId, next){
    log.info("Refreshing client instance "+clientInstanceId);

    //Remove tokens for client instance
    removeTokensForClientInstanceId(clientInstanceId, function(err) {
        if (err) {
            next(err, null, null);
            return;
        }
        //AccessToken and RefreshToken removed successfully - create new ones
        generateNewTokens(clientInstanceId, function(err, accessToken, refreshToken){
            //Update existing client instance with new tokens
            ClientInstance.update({ _id: clientInstanceId }, { $set: { access_token: accessToken._id, refresh_token:refreshToken._id } }, function(err) {
                if(err){
                    log.error("Error updating client instance "+clientInstanceId+" with new tokens: " + err);
                    next(err, null, null);
                }else{
                    next(null, accessToken.token, refreshToken.token);
                }
            });
        });
    });
}

/**
 * Callback which informs about the removing process of a client instance.
 *
 * @callback RemoveClientInstanceCallback
 * @param {object} err set if an error occurred, {@code null} otherwise.
 */

/**
 * Removes the given client instance and all it's tokens.
 * @param {mongoose.Types.ObjectId} clientInstanceId the id of the client instance to remove.
 * @param {RemoveClientInstanceCallback} next the callback which informs about the removing process.
 */
function removeClientInstance(clientInstanceId, next){
    log.info("Removing client instance "+clientInstanceId+" ...");

    //Remove tokens for client instance
    removeTokensForClientInstanceId(clientInstanceId, function(err){
        if(err){
            next(err);
            return;
        }
        //Remove client instance
        ClientInstance.findByIdAndRemove(clientInstanceId , function(err, clientInstance) {
            if(err){
                log.error("Error removing client instance "+clientInstanceId + ": " + err);
                next(new Error(DATABASE_ERROR, "Error removing client instance"));
                return;
            }
            if(!clientInstance){
                //Client instance already removed
                next();
                return;
            }

            var userId = clientInstance.userId;
            if(!userId){
                //This should not be the case - a client instance can't live without a user !
                log.error("No user found for client instance " + clientInstanceId);
                next();
                return;
            }
            //Unlink client instance from user
            User.update({ _id: userId }, { $pull: { clientInstances: clientInstanceId } }, function(err) {
                if(err){
                    log.error("Error pulling client instance "+clientInstanceId+" from of user "+userId + ": " + err);
                    next(new Error(DATABASE_ERROR, "Error pulling client instance from user"));
                    return;
                }
                next();
            });
        });
    });
}

function removeTokensForClientInstanceId(clientInstanceId, next){
    log.info("Removing tokens for client instance "+clientInstanceId+" ...");

    AccessToken.remove({ clientInstanceId : clientInstanceId }, function (err) {
        if (err) {
            log.error("Error removing access token for client instance " + clientInstanceId + ": " + err);
            next(new Error(DATABASE_ERROR, "Error removing access token"), null, null);
            return;
        }
        RefreshToken.remove({clientInstanceId: clientInstanceId}, function (err) {
            if (err) {
                log.error("Error removing refresh token for client instance " + clientInstanceId + ": " + err);
                next(new Error(DATABASE_ERROR, "Error removing refresh token"), null, null);
                return;
            }
        });
        next();
    });
}

function generateNewTokens(clientInstanceId, next){
    log.info("Generate new tokens for client instance "+clientInstanceId+" ...");

    var accessToken = crypto.randomBytes(32).toString("base64");
    var refreshToken = crypto.randomBytes(32).toString("base64");
    var accessTokenHash = crypto.createHash("sha1").update(accessToken).digest("hex");
    var refreshTokenHash = crypto.createHash("sha1").update(refreshToken).digest("hex");

    var expirationDateAccessToken = new Date(new Date().getTime() + config.getAccessTokenLifetime()); // 1 hour
    var expirationDateRefreshToken = new Date(new Date().getTime() + config.getRefreshTokenLifetime()); //14 days

    var accessToken = new AccessToken({
        clientInstanceId: clientInstanceId,
        token: accessTokenHash,
        expirationDate: expirationDateAccessToken
    });

    var refreshToken = new RefreshToken({
        clientInstanceId: clientInstanceId,
        token: refreshTokenHash,
        expirationDate: expirationDateRefreshToken
    });
    accessToken.save(function (err){
        if(err){
            log.error("Error saving access token for client instance " + clientInstanceId + ": " + err);
            next(new Error(DATABASE_ERROR, "Error saving access token"), null, null);
            return;
        }
        refreshToken.save(function (err) {
            if(err){
                log.error("Error saving refresh token for client instance " + clientInstanceId + ": " + err);
                next(new Error(DATABASE_ERROR, "Error saving refresh token"), null, null);
                return;
            }
            next(null, accessToken, refreshToken);
        });
    });
}

var Error = function(type, description){
    this.type = type;
    this.description = description;
}

module.exports = {
    getClientInstanceForUser: getClientInstanceForUser,
    getClientInstanceForRefreshToken: getClientInstanceForRefreshToken,
    createClientInstance: createClientInstance,
    refreshClientInstance: refreshClientInstance,
    removeClientInstance: removeClientInstance
};
