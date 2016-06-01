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
    root.MiJoClientApi.AuthorizationError = factory(root.MiJoClientApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The AuthorizationError model module.
   * @module model/AuthorizationError
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>AuthorizationError</code>.
   * Represents an authorization error.
   * @alias module:model/AuthorizationError
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
   * Constructs a <code>AuthorizationError</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthorizationError} obj Optional instance to populate.
   * @return {module:model/AuthorizationError} The populated <code>AuthorizationError</code> instance.
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
   * Indicates the type of the AuthorizationError.
   * @member {module:model/AuthorizationError.ErrorEnum} error
   */
  exports.prototype['error'] = undefined;
  /**
   * A detailed description of the AuthorizationError.
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
     * value: "invalid_access_token"
     * @const
     */
    "token": "invalid_access_token"  };


  return exports;
}));


