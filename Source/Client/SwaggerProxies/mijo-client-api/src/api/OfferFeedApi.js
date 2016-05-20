(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ServerError', '../model/ApiError', '../model/AuthorizationError', '../model/Offer'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ServerError'), require('../model/ApiError'), require('../model/AuthorizationError'), require('../model/Offer'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.OfferFeedApi = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.ServerError, root.MiJoClientApi.ApiError, root.MiJoClientApi.AuthorizationError, root.MiJoClientApi.Offer);
  }
}(this, function(ApiClient, ServerError, ApiError, AuthorizationError, Offer) {
  'use strict';

  /**
   * OfferFeed service.
   * @module api/OfferFeedApi
   * @version 1.0.0
   */

  /**
   * Constructs a new OfferFeedApi. 
   * @alias module:api/OfferFeedApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the createDownVote operation.
     * @callback module:api/OfferFeedApi~createDownVoteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates an down vote for the given offer by the given user.
     * Creates down up vote for the given offer by the given user.
     * @param {String} id ID of the offer to down vote.
     * @param {module:api/OfferFeedApi~createDownVoteCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.createDownVote = function(id, callback) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling createDownVote";
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
        '/offers/{id}/votes/down', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createUpVote operation.
     * @callback module:api/OfferFeedApi~createUpVoteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates an up vote for the given offer by the given user.
     * Creates an up vote for the given offer by the given user.
     * @param {String} id ID of the offer to up vote.
     * @param {module:api/OfferFeedApi~createUpVoteCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.createUpVote = function(id, callback) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling createUpVote";
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
        '/offers/{id}/votes/up', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getOffers operation.
     * @callback module:api/OfferFeedApi~getOffersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Offer>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns all available offers around certain location.
     * Returns all available offers around certain location. This path allows pagination.
     * @param {Number} lat The latitude of the search location.
     * @param {Number} lon The longitude of search location.
     * @param {Number} maxDistance The maximum distance to search away from the search location
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page The page to get. (default to 1)
     * @param {Number} opts.perPage The number of offers to return per page (default to 10)
     * @param {module:api/OfferFeedApi~getOffersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {Array.<module:model/Offer>}
     */
    this.getOffers = function(lat, lon, maxDistance, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'lat' is set
      if (lat == undefined || lat == null) {
        throw "Missing the required parameter 'lat' when calling getOffers";
      }

      // verify the required parameter 'lon' is set
      if (lon == undefined || lon == null) {
        throw "Missing the required parameter 'lon' when calling getOffers";
      }

      // verify the required parameter 'maxDistance' is set
      if (maxDistance == undefined || maxDistance == null) {
        throw "Missing the required parameter 'maxDistance' when calling getOffers";
      }


      var pathParams = {
      };
      var queryParams = {
        'lat': lat,
        'lon': lon,
        'max_distance': maxDistance,
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
      var returnType = [Offer];

      return this.apiClient.callApi(
        '/offers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
