(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Location', 'model/OfferData', 'model/Payment'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Location'), require('./OfferData'), require('./Payment'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.Offer = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.Location, root.MiJoClientApi.OfferData, root.MiJoClientApi.Payment);
  }
}(this, function(ApiClient, Location, OfferData, Payment) {
  'use strict';




  /**
   * The Offer model module.
   * @module model/Offer
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Offer</code>.
   * Represents the offer of an mirco job offer.
   * @alias module:model/Offer
   * @class
   * @extends module:model/OfferData
   * @param title
   * @param description
   * @param deadline
   * @param id
   */
  var exports = function(title, description, deadline, id) {
    var _this = this;
    OfferData.call(_this, title, description, deadline);
    _this['id'] = id;
  };

  /**
   * Constructs a <code>Offer</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Offer} obj Optional instance to populate.
   * @return {module:model/Offer} The populated <code>Offer</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      OfferData.constructFromObject(data, obj);
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
    }
    return obj;
  }

  exports.prototype = Object.create(OfferData.prototype);
  exports.prototype.constructor = exports;

  /**
   * The id of the offer.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;




  return exports;
}));


