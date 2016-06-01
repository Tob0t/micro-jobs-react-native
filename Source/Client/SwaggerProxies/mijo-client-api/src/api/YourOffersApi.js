(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ServerError', 'model/ApiError', 'model/AuthorizationError', 'model/ContactInformation', 'model/OfferInterest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ServerError'), require('../model/ApiError'), require('../model/AuthorizationError'), require('../model/ContactInformation'), require('../model/OfferInterest'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.YourOffersApi = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.ServerError, root.MiJoClientApi.ApiError, root.MiJoClientApi.AuthorizationError, root.MiJoClientApi.ContactInformation, root.MiJoClientApi.OfferInterest);
  }
}(this, function(ApiClient, ServerError, ApiError, AuthorizationError, ContactInformation, OfferInterest) {
  'use strict';

  /**
   * YourOffers service.
   * @module api/YourOffersApi
   * @version 1.0.0
   */

  /**
   * Constructs a new YourOffersApi. 
   * @alias module:api/YourOffersApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the createMatch operation.
     * @callback module:api/YourOffersApi~createMatchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactInformation} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates a match between the offer and the given users.
     * Creates a match between the offer and the given users. If the match has been created successfully the contact information of the given user are returned.
     * @param {String} offerId ID of the offer to create a match for.
     * @param {String} userId ID of the user to create a match for.
     * @param {module:api/YourOffersApi~createMatchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ContactInformation}
     */
    this.createMatch = function(offerId, userId, callback) {
      var postBody = null;

      // verify the required parameter 'offerId' is set
      if (offerId == undefined || offerId == null) {
        throw "Missing the required parameter 'offerId' when calling createMatch";
      }

      // verify the required parameter 'userId' is set
      if (userId == undefined || userId == null) {
        throw "Missing the required parameter 'userId' when calling createMatch";
      }


      var pathParams = {
        'offerId': offerId,
        'userId': userId
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
      var returnType = ContactInformation;

      return this.apiClient.callApi(
        '/user/offers/{offerId}/interest/match/{userId}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the declineUserForOffer operation.
     * @callback module:api/YourOffersApi~declineUserForOfferCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Declines an interessted user for an offer.
     * Declines an interessted user for an offer.
     * @param {String} offerId ID of the offer for which to decline the given user.
     * @param {String} userId ID of the user to decline.
     * @param {module:api/YourOffersApi~declineUserForOfferCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.declineUserForOffer = function(offerId, userId, callback) {
      var postBody = null;

      // verify the required parameter 'offerId' is set
      if (offerId == undefined || offerId == null) {
        throw "Missing the required parameter 'offerId' when calling declineUserForOffer";
      }

      // verify the required parameter 'userId' is set
      if (userId == undefined || userId == null) {
        throw "Missing the required parameter 'userId' when calling declineUserForOffer";
      }


      var pathParams = {
        'offerId': offerId,
        'userId': userId
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
        '/user/offers/{offerId}/interest/decline/{userId}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getOfferInterests operation.
     * @callback module:api/YourOffersApi~getOfferInterestsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/OfferInterest>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns all offer interest of the useres created offers.
     * Returns all offer interest of the useres created offers. This path allows pagination.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page The page to get. (default to 1)
     * @param {Number} opts.perPage The number of offers to return per page (default to 10)
     * @param {module:api/YourOffersApi~getOfferInterestsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {Array.<module:model/OfferInterest>}
     */
    this.getOfferInterests = function(opts, callback) {
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
      var returnType = [OfferInterest];

      return this.apiClient.callApi(
        '/user/offers/interest', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
