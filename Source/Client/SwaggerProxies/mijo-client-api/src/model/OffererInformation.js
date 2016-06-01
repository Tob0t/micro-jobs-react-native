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
    root.MiJoClientApi.OffererInformation = factory(root.MiJoClientApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The OffererInformation model module.
   * @module model/OffererInformation
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>OffererInformation</code>.
   * Represents the information of an offer offerer.
   * @alias module:model/OffererInformation
   * @class
   * @param id
   * @param image
   * @param prename
   * @param surname
   */
  var exports = function(id, image, prename, surname) {
    var _this = this;

    _this['id'] = id;
    _this['image'] = image;
    _this['prename'] = prename;
    _this['surname'] = surname;
  };

  /**
   * Constructs a <code>OffererInformation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OffererInformation} obj Optional instance to populate.
   * @return {module:model/OffererInformation} The populated <code>OffererInformation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('prename')) {
        obj['prename'] = ApiClient.convertToType(data['prename'], 'String');
      }
      if (data.hasOwnProperty('surname')) {
        obj['surname'] = ApiClient.convertToType(data['surname'], 'String');
      }
    }
    return obj;
  }

  /**
   * The unique user id of the offerer
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The profile image of the offerer encoded as base64 string.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The prename of the offerer.
   * @member {String} prename
   */
  exports.prototype['prename'] = undefined;
  /**
   * The surname of the offerer.
   * @member {String} surname
   */
  exports.prototype['surname'] = undefined;




  return exports;
}));


