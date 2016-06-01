(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/TakerInformation'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TakerInformation'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.OfferInterest = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.TakerInformation);
  }
}(this, function(ApiClient, TakerInformation) {
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
   * @param offerImage
   * @param takers
   */
  var exports = function(offerId, offerTitle, offerImage, takers) {
    var _this = this;

    _this['offerId'] = offerId;
    _this['offerTitle'] = offerTitle;
    _this['offerImage'] = offerImage;
    _this['takers'] = takers;
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
      if (data.hasOwnProperty('offerImage')) {
        obj['offerImage'] = ApiClient.convertToType(data['offerImage'], 'String');
      }
      if (data.hasOwnProperty('takers')) {
        obj['takers'] = ApiClient.convertToType(data['takers'], [TakerInformation]);
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
   * The image of the offer as base64.
   * @member {String} offerImage
   */
  exports.prototype['offerImage'] = undefined;
  /**
   * Information of the interested users aka taker.
   * @member {Array.<module:model/TakerInformation>} takers
   */
  exports.prototype['takers'] = undefined;




  return exports;
}));


