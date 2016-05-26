(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './ContactInformation', './UserProfileData'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ContactInformation'), require('./UserProfileData'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.UserProfile = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.ContactInformation, root.MiJoClientApi.UserProfileData);
  }
}(this, function(ApiClient, ContactInformation, UserProfileData) {
  'use strict';

  /**
   * The UserProfile model module.
   * @module model/UserProfile
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>UserProfile</code>.
   * Represents the data of a user profile.
   * @alias module:model/UserProfile
   * @class
   * @extends module:model/UserProfileData
   * @param image
   * @param prename
   * @param surname
   * @param age
   * @param contactInformation
   * @param id
   */
  var exports = function(image, prename, surname, age, contactInformation, id) {
    UserProfileData.call(this, image, prename, surname, age, contactInformation);
    this['id'] = id;
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
      UserProfileData.constructFromObject(data, obj);
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
    }
    return obj;
  }

  exports.prototype = Object.create(UserProfileData.prototype);
  exports.prototype.constructor = exports;


  /**
   * The unique id of the user
   * @member {String} id
   */
  exports.prototype['id'] = undefined;




  return exports;
}));
