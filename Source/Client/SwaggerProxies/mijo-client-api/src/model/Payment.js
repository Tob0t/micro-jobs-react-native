(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.Payment = factory(root.MiJoClientApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Payment model module.
   * @module model/Payment
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Payment</code>.
   * Represents the payment of an offer.
   * @alias module:model/Payment
   * @class
   * @param type
   * @param value
   */
  var exports = function(type, value) {
    var _this = this;

    _this['type'] = type;
    _this['value'] = value;
  };

  /**
   * Constructs a <code>Payment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Payment} obj Optional instance to populate.
   * @return {module:model/Payment} The populated <code>Payment</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
    }
    return obj;
  }

  /**
   * The type of the payment.
   * @member {module:model/Payment.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The value of the payment.
   * @member {String} value
   */
  exports.prototype['value'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "MONEY"
     * @const
     */
    "MONEY": "MONEY",
    /**
     * value: "SERVICE"
     * @const
     */
    "SERVICE": "SERVICE"  };


  return exports;
}));


