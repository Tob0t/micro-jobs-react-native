var config = require("../../util/config");

/**
 * Responses an access token and refresh token.
 * @param {object] res the response.
 * @param {string} accessToken the access token to response.
 * @param {string} refreshToken the refresh token to response.
 */
function sendTokenResponse(res, accessToken, refreshToken){
    res.setHeader("Cache-Control", "no-store")
    res.setHeader("Pragma", "no-cache");
    res.status(200);
    res.json({
        "access_token" : accessToken,
        "token_type" : "Bearer",
        "expires_in" : config.getAccessTokenLifetime(),
        "refresh_token" : refreshToken,
    });
}

module.exports = {
    sendTokenResponse : sendTokenResponse
}