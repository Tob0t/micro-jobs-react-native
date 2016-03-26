(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['../ApiClient', '../model/OAuthError', '../model/KeyPair', '../model/ServerError'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS-like environments that support module.exports, like Node.
        module.exports = factory(require('../ApiClient'), require('../model/OAuthError'), require('../model/KeyPair'), require('../model/ServerError'));
    } else {
        // Browser globals (root is window)
        if (!root.MiJoAuthorizationApi) {
            root.MiJoAuthorizationApi = {};
        }
        root.MiJoAuthorizationApi.UsernamepasswordApi = factory(root.MiJoAuthorizationApi.ApiClient, root.MiJoAuthorizationApi.OAuthError, root.MiJoAuthorizationApi.KeyPair, root.MiJoAuthorizationApi.ServerError);
    }
}(this, function (ApiClient, OAuthError, KeyPair, ServerError) {
    'use strict';

    /**
     * Usernamepassword service.
     * @module api/UsernamepasswordApi
     * @version 1.0.0
     */

    /**
     * Constructs a new UsernamepasswordApi.
     * @alias module:api/UsernamepasswordApi
     * @class
     * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
     * if unspecified.
     */
    var exports = function (apiClient) {
        this.apiClient = apiClient || ApiClient.instance;

        /**
         * Callback function to receive the result of the getKeyPairForUsernameAndPassword operation.
         * @callback module:api/UsernamepasswordApi~getKeyPairForUsernameAndPasswordCallback
         * @param {String} error Error message, if any.
         * @param {module:model/KeyPair} data The data returned by the service call.
         * @param {String} response The complete HTTP response.
         */

        /**
         * Get a token keypair for a username and a password.
         * Get a token keypair for a username and a password. This request revokes the old keypair for the given client instance if there is one
         * @param {String} grantType The grant type. Should be password.
         * @param {String} username The email of the user.
         * @param {String} password The password of the user.
         * @param {String} mijoClientInstanceId The client instance id which identifies the client of the user.
         * @param {module:api/UsernamepasswordApi~getKeyPairForUsernameAndPasswordCallback} callback The callback function, accepting three arguments: error, data, response
         * data is of type: {module:model/KeyPair}
         */
        this.getKeyPairForUsernameAndPassword = function (grantType, username, password, mijoClientInstanceId, callback) {
            var postBody = null;

            // verify the required parameter 'grantType' is set
            if (grantType == undefined || grantType == null) {
                throw "Missing the required parameter 'grantType' when calling getKeyPairForUsernameAndPassword";
            }

            // verify the required parameter 'username' is set
            if (username == undefined || username == null) {
                throw "Missing the required parameter 'username' when calling getKeyPairForUsernameAndPassword";
            }

            // verify the required parameter 'password' is set
            if (password == undefined || password == null) {
                throw "Missing the required parameter 'password' when calling getKeyPairForUsernameAndPassword";
            }

            // verify the required parameter 'mijoClientInstanceId' is set
            if (mijoClientInstanceId == undefined || mijoClientInstanceId == null) {
                throw "Missing the required parameter 'mijoClientInstanceId' when calling getKeyPairForUsernameAndPassword";
            }


            var pathParams = {};
            var queryParams = {};
            var headerParams = {};
            var formParams = {
                'grant_type': grantType,
                'username': username,
                'password': password,
                'mijo_client_instance_id': mijoClientInstanceId
            };

            var authNames = ['Client Authentication'];
            var contentTypes = ['application/x-www-form-urlencoded'];
            var accepts = ['application/json'];
            var returnType = KeyPair;

            return this.apiClient.callApi(
                '', 'POST',
                pathParams, queryParams, headerParams, formParams, postBody,
                authNames, contentTypes, accepts, returnType, callback
            );
        }

        /**
         * Callback function to receive the result of the getKeyPairForRefreshToken operation.
         * @callback module:api/RefreshtokenApi~getKeyPairForRefreshTokenCallback
         * @param {String} error Error message, if any.
         * @param {module:model/KeyPair} data The data returned by the service call.
         * @param {String} response The complete HTTP response.
         */

        /**
         * Get a token keypair for a refresh token.
         * Get a token keypair for a refresh token. This request revokes the old keypair for the given client instance if there is one.
         * @param {String} grantType The grant type. Should be facebook
         * @param {String} refreshToken The refresh token to refresh the expired access token.
         * @param {String} mijoClientInstanceId The client instance id which identifies the client of the user.
         * @param {module:api/RefreshtokenApi~getKeyPairForRefreshTokenCallback} callback The callback function, accepting three arguments: error, data, response
         * data is of type: {module:model/KeyPair}
         */
        this.getKeyPairForRefreshToken = function (grantType, refreshToken, mijoClientInstanceId, callback) {
            var postBody = null;

            // verify the required parameter 'grantType' is set
            if (grantType == undefined || grantType == null) {
                throw "Missing the required parameter 'grantType' when calling getKeyPairForRefreshToken";
            }

            // verify the required parameter 'refreshToken' is set
            if (refreshToken == undefined || refreshToken == null) {
                throw "Missing the required parameter 'refreshToken' when calling getKeyPairForRefreshToken";
            }

            // verify the required parameter 'mijoClientInstanceId' is set
            if (mijoClientInstanceId == undefined || mijoClientInstanceId == null) {
                throw "Missing the required parameter 'mijoClientInstanceId' when calling getKeyPairForRefreshToken";
            }


            var pathParams = {};
            var queryParams = {};
            var headerParams = {};
            var formParams = {
                'grant_type': grantType,
                'refresh_token': refreshToken,
                'mijo_client_instance_id': mijoClientInstanceId
            };

            var authNames = ['Client Authentication'];
            var contentTypes = ['application/x-www-form-urlencoded'];
            var accepts = ['application/json'];
            var returnType = KeyPair;

            return this.apiClient.callApi(
                '', 'POST',
                pathParams, queryParams, headerParams, formParams, postBody,
                authNames, contentTypes, accepts, returnType, callback
            );
        }

        /**
         * Callback function to receive the result of the getKeyPairForFacebookToken operation.
         * @callback module:api/FacebookApi~getKeyPairForFacebookTokenCallback
         * @param {String} error Error message, if any.
         * @param {module:model/KeyPair} data The data returned by the service call.
         * @param {String} response The complete HTTP response.
         */

        /**
         * Get a token keypair for a facebook access token
         * Get a token keypair for a facebook access token. This request revokes the old keypair for the given client instance if there is one.
         * @param {String} grantType The grant type. Should be facebook
         * @param {String} fbAccessToken The facebook access token of the user.
         * @param {String} mijoClientInstanceId The client instance id which identifies the client of the user.
         * @param {module:api/FacebookApi~getKeyPairForFacebookTokenCallback} callback The callback function, accepting three arguments: error, data, response
         * data is of type: {module:model/KeyPair}
         */
        this.getKeyPairForFacebookToken = function (grantType, fbAccessToken, mijoClientInstanceId, callback) {
            var postBody = null;

            // verify the required parameter 'grantType' is set
            if (grantType == undefined || grantType == null) {
                throw "Missing the required parameter 'grantType' when calling getKeyPairForFacebookToken";
            }

            // verify the required parameter 'fbAccessToken' is set
            if (fbAccessToken == undefined || fbAccessToken == null) {
                throw "Missing the required parameter 'fbAccessToken' when calling getKeyPairForFacebookToken";
            }

            // verify the required parameter 'mijoClientInstanceId' is set
            if (mijoClientInstanceId == undefined || mijoClientInstanceId == null) {
                throw "Missing the required parameter 'mijoClientInstanceId' when calling getKeyPairForFacebookToken";
            }


            var pathParams = {};
            var queryParams = {};
            var headerParams = {};
            var formParams = {
                'grant_type': grantType,
                'fb_access_token': fbAccessToken,
                'mijo_client_instance_id': mijoClientInstanceId
            };

            var authNames = ['Client Authentication'];
            var contentTypes = ['application/x-www-form-urlencoded'];
            var accepts = ['application/json'];
            var returnType = KeyPair;

            return this.apiClient.callApi(
                '', 'POST',
                pathParams, queryParams, headerParams, formParams, postBody,
                authNames, contentTypes, accepts, returnType, callback
            );
        }
    };


    return exports;
}));
