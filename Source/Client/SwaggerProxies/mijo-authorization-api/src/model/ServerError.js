(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoAuthorizationApi) {
      root.MiJoAuthorizationApi = {};
    }
    root.MiJoAuthorizationApi.ServerError = factory(root.MiJoAuthorizationApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ServerError model module.
   * @module model/ServerError
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>ServerError</code>.
   * Represents an error which occurred due to an internal server error.
   * @alias module:model/ServerError
   * @class
   * @param error
   * @param errorDescription
   */
  var exports = function(error, errorDescription) {

    this['error'] = error;
    this['error_description'] = errorDescription;
  };

  /**
   * Constructs a <code>ServerError</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ServerError} obj Optional instance to populate.
   * @return {module:model/ServerError} The populated <code>ServerError</code> instance.
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
   * Indicates the type of the ServerError.
   * @member {module:model/ServerError.ErrorEnum} error
   */
  exports.prototype['error'] = undefined;

  /**
   * A detailed description of the ServerError.
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
     * value: general
     * @const
     */
    GENERAL: "general",
    
    /**
     * value: database
     * @const
     */
    DATABASE: "database"
  };

  return exports;
}));