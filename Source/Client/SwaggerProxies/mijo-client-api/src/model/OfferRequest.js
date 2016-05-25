(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './UserProfile'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./UserProfile'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.OfferRequest = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.UserProfile);
  }
}(this, function(ApiClient, UserProfile) {
  'use strict';

  /**
   * The OfferRequest model module.
   * @module model/OfferRequest
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>OfferRequest</code>.
   * Represents an offer request of a micro job.
   * @alias module:model/OfferRequest
   * @class
   * @param offerId
   * @param offerTitle
   * @param offerer
   */
  var exports = function(offerId, offerTitle, offerer) {

    this['offerId'] = offerId;
    this['offerTitle'] = offerTitle;
    this['offerer'] = offerer;
  };

  /**
   * Constructs a <code>OfferRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OfferRequest} obj Optional instance to populate.
   * @return {module:model/OfferRequest} The populated <code>OfferRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('offerId')) {
        obj['offerId'] = ApiClient.convertToType(data['offerId'], 'String');
      }
      if (data.hasOwnProperty('offerTitle')) {
        obj['offerTitle'] = ApiClient.convertToType(data['offerTitle'], 'String');
      }
      if (data.hasOwnProperty('offerer')) {
        obj['offerer'] = UserProfile.constructFromObject(data['offerer']);
      }
    }
    return obj;
  }


  /**
   * The id of the related offer.
   * @member {String} offerId
   */
  exports.prototype['offerId'] = undefined;

  /**
   * The title of the related offer.
   * @member {String} offerTitle
   */
  exports.prototype['offerTitle'] = undefined;

  /**
   * @member {module:model/UserProfile} offerer
   */
  exports.prototype['offerer'] = undefined;




  return exports;
}));