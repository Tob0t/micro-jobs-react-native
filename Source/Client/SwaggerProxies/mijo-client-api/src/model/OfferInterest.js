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
    root.MiJoClientApi.OfferInterest = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.UserProfile);
  }
}(this, function(ApiClient, UserProfile) {
  'use strict';

  /**
   * The OfferInterest model module.
   * @module model/OfferInterest
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>OfferInterest</code>.
   * Represents an offer interest of a micro job.
   * @alias module:model/OfferInterest
   * @class
   * @param offerId
   * @param offerTitle
   * @param users
   */
  var exports = function(offerId, offerTitle, users) {

    this['offerId'] = offerId;
    this['offerTitle'] = offerTitle;
    this['users'] = users;
  };

  /**
   * Constructs a <code>OfferInterest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OfferInterest} obj Optional instance to populate.
   * @return {module:model/OfferInterest} The populated <code>OfferInterest</code> instance.
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
      if (data.hasOwnProperty('users')) {
        obj['users'] = ApiClient.convertToType(data['users'], [UserProfile]);
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
   * The user profile of the interested users.
   * @member {Array.<module:model/UserProfile>} users
   */
  exports.prototype['users'] = undefined;




  return exports;
}));
