(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/OfferData', '../model/ServerError', '../model/ApiError', '../model/AuthorizationError'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/OfferData'), require('../model/ServerError'), require('../model/ApiError'), require('../model/AuthorizationError'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.OfferEditApi = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.OfferData, root.MiJoClientApi.ServerError, root.MiJoClientApi.ApiError, root.MiJoClientApi.AuthorizationError);
  }
}(this, function(ApiClient, OfferData, ServerError, ApiError, AuthorizationError) {
  'use strict';

  /**
   * OfferEdit service.
   * @module api/OfferEditApi
   * @version 1.0.0
   */

  /**
   * Constructs a new OfferEditApi. 
   * @alias module:api/OfferEditApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the updateOffer operation.
     * @callback module:api/OfferEditApi~updateOfferCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates the given offer
     * Updates the offer with the given id. The offer must have been created by the given user.
     * @param {String} id ID of the offer to update.
     * @param {module:model/OfferData} offer The offer data to update.
     * @param {module:api/OfferEditApi~updateOfferCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateOffer = function(id, offer, callback) {
      var postBody = offer;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling updateOffer";
      }

      // verify the required parameter 'offer' is set
      if (offer == undefined || offer == null) {
        throw "Missing the required parameter 'offer' when calling updateOffer";
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
      var returnType = null;

      return this.apiClient.callApi(
        '/user/offers/{id}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
