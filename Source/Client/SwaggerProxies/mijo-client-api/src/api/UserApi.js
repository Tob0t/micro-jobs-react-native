(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ServerError', '../model/UserProfileData', '../model/ApiError', '../model/AuthorizationError'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ServerError'), require('../model/UserProfileData'), require('../model/ApiError'), require('../model/AuthorizationError'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.UserApi = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.ServerError, root.MiJoClientApi.UserProfileData, root.MiJoClientApi.ApiError, root.MiJoClientApi.AuthorizationError);
  }
}(this, function(ApiClient, ServerError, UserProfileData, ApiError, AuthorizationError) {
  'use strict';

  /**
   * User service.
   * @module api/UserApi
   * @version 1.0.0
   */

  /**
   * Constructs a new UserApi. 
   * @alias module:api/UserApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getUserProfile operation.
     * @callback module:api/UserApi~getUserProfileCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserProfileData} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Return the user profile of the user.
     * Return the user profile of the user which belongs to the given access token.
     * @param {module:api/UserApi~getUserProfileCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/UserProfileData}
     */
    this.getUserProfile = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['MiJo API Key'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = UserProfileData;

      return this.apiClient.callApi(
        '/user', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateUserProfile operation.
     * @callback module:api/UserApi~updateUserProfileCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates the user profile of the user.
     * Updates the user profile of the user which belongs to the given access token.
     * @param {module:model/UserProfileData} userProfile The new user profile.
     * @param {module:api/UserApi~updateUserProfileCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateUserProfile = function(userProfile, callback) {
      var postBody = userProfile;

      // verify the required parameter 'userProfile' is set
      if (userProfile == undefined || userProfile == null) {
        throw "Missing the required parameter 'userProfile' when calling updateUserProfile";
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['MiJo API Key'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/user', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
