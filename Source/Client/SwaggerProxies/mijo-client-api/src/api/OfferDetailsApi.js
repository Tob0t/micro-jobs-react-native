(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/Offer', '../model/ServerError', '../model/ApiError', '../model/AuthorizationError'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Offer'), require('../model/ServerError'), require('../model/ApiError'), require('../model/AuthorizationError'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.OfferDetailsApi = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.Offer, root.MiJoClientApi.ServerError, root.MiJoClientApi.ApiError, root.MiJoClientApi.AuthorizationError);
  }
}(this, function(ApiClient, Offer, ServerError, ApiError, AuthorizationError) {
  'use strict';

  /**
   * OfferDetails service.
   * @module api/OfferDetailsApi
   * @version 1.0.0
   */

  /**
   * Constructs a new OfferDetailsApi. 
   * @alias module:api/OfferDetailsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getOffer operation.
     * @callback module:api/OfferDetailsApi~getOfferCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Offer} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns the offer with the given id.
     * Returns the offer with the given id. The offer must have been created by the given user.
     * @param {String} id ID of the offer to fetch.
     * @param {module:api/OfferDetailsApi~getOfferCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/Offer}
     */
    this.getOffer = function(id, callback) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling getOffer";
      }


      var pathParams = {
        'id': id
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
      var returnType = Offer;

      return this.apiClient.callApi(
        '/user/offers/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));