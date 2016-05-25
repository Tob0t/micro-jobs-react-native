(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.UserProfile = factory(root.MiJoClientApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The UserProfile model module.
   * @module model/UserProfile
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>UserProfile</code>.
   * Represents user information.
   * @alias module:model/UserProfile
   * @class
   * @param id
   * @param image
   * @param prename
   * @param surname
   */
  var exports = function(id, image, prename, surname) {

    this['id'] = id;
    this['image'] = image;
    this['prename'] = prename;
    this['surname'] = surname;
  };

  /**
   * Constructs a <code>UserProfile</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserProfile} obj Optional instance to populate.
   * @return {module:model/UserProfile} The populated <code>UserProfile</code> instance.
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
   * The unique id of the user
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

  /**
   * The profile image of the user encoded as base64 string.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;

  /**
   * The prename of the user.
   * @member {String} prename
   */
  exports.prototype['prename'] = undefined;

  /**
   * The surname of the user.
   * @member {String} surname
   */
  exports.prototype['surname'] = undefined;




  return exports;
}));
