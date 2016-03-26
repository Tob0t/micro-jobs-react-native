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
    root.MiJoAuthorizationApi.OAuthError = factory(root.MiJoAuthorizationApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The OAuthError model module.
   * @module model/OAuthError
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>OAuthError</code>.
   * Represents a standard OAuth 2.0 error
   * @alias module:model/OAuthError
   * @class
   * @param error
   * @param errorDescription
   */
  var exports = function(error, errorDescription) {

    this['error'] = error;
    this['error_description'] = errorDescription;
  };

  /**
   * Constructs a <code>OAuthError</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OAuthError} obj Optional instance to populate.
   * @return {module:model/OAuthError} The populated <code>OAuthError</code> instance.
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
   * Indicates the type of the OAuthError.
   * @member {module:model/OAuthError.ErrorEnum} error
   */
  exports.prototype['error'] = undefined;

  /**
   * A detailed description of the OAuthError.
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
     * value: invalid_request
     * @const
     */
    INVALID_REQUEST: "invalid_request",
    
    /**
     * value: invalid_client
     * @const
     */
    INVALID_CLIENT: "invalid_client",
    
    /**
     * value: invalid_grant
     * @const
     */
    INVALID_GRANT: "invalid_grant",
    
    /**
     * value: unauthorized_client
     * @const
     */
    UNAUTHORIZED_CLIENT: "unauthorized_client",
    
    /**
     * value: unsupported_grant_type
     * @const
     */
    UNSUPPORTED_GRANT_TYPE: "unsupported_grant_type"
  };

  return exports;
}));
