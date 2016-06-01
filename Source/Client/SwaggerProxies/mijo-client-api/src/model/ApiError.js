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
    root.MiJoClientApi.ApiError = factory(root.MiJoClientApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ApiError model module.
   * @module model/ApiError
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>ApiError</code>.
   * Represents an API error.
   * @alias module:model/ApiError
   * @class
   * @param error
   * @param errorDescription
   */
  var exports = function(error, errorDescription) {
    var _this = this;

    _this['error'] = error;
    _this['error_description'] = errorDescription;
  };

  /**
   * Constructs a <code>ApiError</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ApiError} obj Optional instance to populate.
   * @return {module:model/ApiError} The populated <code>ApiError</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('error')) {
        obj['error'] = ApiClient.convertToType(data['error'], 'String');
      }
      if (data.hasOwnProperty('error_description')) {
        obj['error_description'] = ApiClient.convertToType(data['error_description'], 'String');
      }
    }
    return obj;
  }

  /**
   * Indicates the type of the ApiError.
   * @member {module:model/ApiError.ErrorEnum} error
   */
  exports.prototype['error'] = undefined;
  /**
   * A detailed description of the ApiError.
   * @member {String} error_description
   */
  exports.prototype['error_description'] = undefined;


  /**
   * Allowed values for the <code>error</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ErrorEnum = {
    /**
     * value: "invalid_data"
     * @const
     */
    "data": "invalid_data"  };


  return exports;
}));


