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
    root.MiJoClientApi.TakerInformation = factory(root.MiJoClientApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The TakerInformation model module.
   * @module model/TakerInformation
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>TakerInformation</code>.
   * Represents the information of an offer taker.
   * @alias module:model/TakerInformation
   * @class
   * @param id
   * @param status
   * @param prename
   * @param surname
   * @param age
   */
  var exports = function(id, status, prename, surname, age) {
    var _this = this;

    _this['id'] = id;
    _this['status'] = status;
    _this['prename'] = prename;
    _this['surname'] = surname;
    _this['age'] = age;
  };

  /**
   * Constructs a <code>TakerInformation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TakerInformation} obj Optional instance to populate.
   * @return {module:model/TakerInformation} The populated <code>TakerInformation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('prename')) {
        obj['prename'] = ApiClient.convertToType(data['prename'], 'String');
      }
      if (data.hasOwnProperty('surname')) {
        obj['surname'] = ApiClient.convertToType(data['surname'], 'String');
      }
      if (data.hasOwnProperty('age')) {
        obj['age'] = ApiClient.convertToType(data['age'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The unique user id of the taker
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The status of the taker.
   * @member {module:model/TakerInformation.StatusEnum} status
   */
  exports.prototype['status'] = undefined;
  /**
   * The prename of the taker.
   * @member {String} prename
   */
  exports.prototype['prename'] = undefined;
  /**
   * The surname of the taker.
   * @member {String} surname
   */
  exports.prototype['surname'] = undefined;
  /**
   * The age of the taker.
   * @member {Number} age
   */
  exports.prototype['age'] = undefined;


  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "ACCEPTED"
     * @const
     */
    "ACCEPTED": "ACCEPTED",
    /**
     * value: "DECLINED"
     * @const
     */
    "DECLINED": "DECLINED",
    /**
     * value: "NONE"
     * @const
     */
    "NONE": "NONE"  };


  return exports;
}));


