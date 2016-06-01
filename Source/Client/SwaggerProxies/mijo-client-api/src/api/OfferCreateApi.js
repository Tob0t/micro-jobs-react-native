(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OfferData', 'model/ServerError', 'model/ApiError', 'model/AuthorizationError'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/OfferData'), require('../model/ServerError'), require('../model/ApiError'), require('../model/AuthorizationError'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.OfferCreateApi = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.OfferData, root.MiJoClientApi.ServerError, root.MiJoClientApi.ApiError, root.MiJoClientApi.AuthorizationError);
  }
}(this, function(ApiClient, OfferData, ServerError, ApiError, AuthorizationError) {
  'use strict';

  /**
   * OfferCreate service.
   * @module api/OfferCreateApi
   * @version 1.0.0
   */

  /**
   * Constructs a new OfferCreateApi. 
   * @alias module:api/OfferCreateApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the createOffer operation.
     * @callback module:api/OfferCreateApi~createOfferCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates a new offer for the given user.
     * Creates a new offer for the given user. The created offer will be available in the public offer feed.
     * @param {module:model/OfferData} offer The offer created on the client.
     * @param {module:api/OfferCreateApi~createOfferCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.createOffer = function(offer, callback) {
      var postBody = offer;

      // verify the required parameter 'offer' is set
      if (offer == undefined || offer == null) {
        throw "Missing the required parameter 'offer' when calling createOffer";
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
        '/user/offers', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
