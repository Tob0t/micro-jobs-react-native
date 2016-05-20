(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/OfferRequest', '../model/ServerError', '../model/ApiError', '../model/AuthorizationError'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/OfferRequest'), require('../model/ServerError'), require('../model/ApiError'), require('../model/AuthorizationError'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.YourRequestsApi = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.OfferRequest, root.MiJoClientApi.ServerError, root.MiJoClientApi.ApiError, root.MiJoClientApi.AuthorizationError);
  }
}(this, function(ApiClient, OfferRequest, ServerError, ApiError, AuthorizationError) {
  'use strict';

  /**
   * YourRequests service.
   * @module api/YourRequestsApi
   * @version 1.0.0
   */

  /**
   * Constructs a new YourRequestsApi. 
   * @alias module:api/YourRequestsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getMatchedRequests operation.
     * @callback module:api/YourRequestsApi~getMatchedRequestsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/OfferRequest>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns all requests for which the given user has been matched.
     * Returns all requests for which the given user has been matched. This path allows pagination.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page The page to get. (default to 1)
     * @param {Number} opts.perPage The number of offers to return per page (default to 10)
     * @param {module:api/YourRequestsApi~getMatchedRequestsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {Array.<module:model/OfferRequest>}
     */
    this.getMatchedRequests = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'page': opts['page'],
        'per_page': opts['perPage']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['MiJo API Key'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [OfferRequest];

      return this.apiClient.callApi(
        '/user/requests/matches', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
