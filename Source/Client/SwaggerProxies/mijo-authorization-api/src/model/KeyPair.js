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
    root.MiJoAuthorizationApi.KeyPair = factory(root.MiJoAuthorizationApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The KeyPair model module.
   * @module model/KeyPair
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>KeyPair</code>.
   * The key pair which contains the access and refresh token for a certain credential.
   * @alias module:model/KeyPair
   * @class
   * @param accessToken
   * @param expiresIn
   * @param refreshToken
   * @param tokenType
   */
  var exports = function(accessToken, expiresIn, refreshToken, tokenType) {

    this['access_token'] = accessToken;
    this['expires_in'] = expiresIn;
    this['refresh_token'] = refreshToken;
    this['token_type'] = tokenType;
  };

  /**
   * Constructs a <code>KeyPair</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/KeyPair} obj Optional instance to populate.
   * @return {module:model/KeyPair} The populated <code>KeyPair</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('access_token')) {
        obj['access_token'] = ApiClient.convertToType(data['access_token'], 'String');
      }
      if (data.hasOwnProperty('expires_in')) {
        obj['expires_in'] = ApiClient.convertToType(data['expires_in'], 'Integer');
      }
      if (data.hasOwnProperty('refresh_token')) {
        obj['refresh_token'] = ApiClient.convertToType(data['refresh_token'], 'String');
      }
      if (data.hasOwnProperty('token_type')) {
        obj['token_type'] = ApiClient.convertToType(data['token_type'], 'String');
      }
    }
    return obj;
  }


  /**
   * The access token which is valid for the given expiration time.
   * @member {String} access_token
   */
  exports.prototype['access_token'] = undefined;

  /**
   * The expiration time of the access token in seconds.
   * @member {Integer} expires_in
   */
  exports.prototype['expires_in'] = undefined;

  /**
   * The refresh token which is used to refresh an expired access token.
   * @member {String} refresh_token
   */
  exports.prototype['refresh_token'] = undefined;

  /**
   * Indicates the type of the access token.
   * @member {String} token_type
   */
  exports.prototype['token_type'] = undefined;




  return exports;
}));
