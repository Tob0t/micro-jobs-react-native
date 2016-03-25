//OAuth standard errors
var OAUTH_ERROR = {
    INVALID_REQUEST: "invalid_request",
    INVALID_CLIENT: "invalid_client",
    INVALID_GRANT: "invalid_grant",
    UNAUTHORIZED_CLIENT: "unauthorized_client",
    UNSUPPORTED_GRANT_TYPE: "unsupported_grant_type",
};

//Server errors
var SERVER_ERROR = {
    GENERAL: "general",
    DATABASE: "database"
};

/**
 * Responses an server error.
 * @param {object} res the response.
 * @param {string} serverError represents the type of the error.
 * @param {string} description the description of the error.
 */
function sendServerError(res, serverError, description){
    res.status(500);
    res.json({
        error : serverError,
        error_description: description
    });
}

/**
 * Responses an OAuth 2.0 error.
 * @param {object} res the response.
 * @param {string} oauthError represents the type of the error.
 * @param {string} description the description of the error.
 */
function sendOAuthError(res, oauthError, description){
    if(oauthError == OAUTH_ERROR.INVALID_CLIENT){
        res.setHeader("WWW-Authenticate","Basic realm=\"Users\"");
        res.status(401);
    }else{
        res.status(400);
    }
    res.setHeader("Cache-Control", "no-store")
    res.setHeader("Pragma", "no-cache");
    res.json({
        error : oauthError,
        error_description: description
    });
}

module.exports = {
    sendServerError: sendServerError,
    sendOAuthError: sendOAuthError,
    ERROR_TYPES : {
        OAUTH: OAUTH_ERROR,
        SERVER: SERVER_ERROR,
    }
}