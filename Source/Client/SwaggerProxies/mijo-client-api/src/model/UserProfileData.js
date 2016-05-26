(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './ContactInformation'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ContactInformation'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.UserProfileData = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.ContactInformation);
  }
}(this, function(ApiClient, ContactInformation) {
  'use strict';

  /**
   * The UserProfileData model module.
   * @module model/UserProfileData
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>UserProfileData</code>.
   * Represents user information.
   * @alias module:model/UserProfileData
   * @class
   * @param image
   * @param prename
   * @param surname
   * @param age
   * @param contactInformation
   */
  var exports = function(image, prename, surname, age, contactInformation) {

    this['image'] = image;
    this['prename'] = prename;
    this['surname'] = surname;
    this['age'] = age;
    this['contactInformation'] = contactInformation;
  };

  /**
   * Constructs a <code>UserProfileData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserProfileData} obj Optional instance to populate.
   * @return {module:model/UserProfileData} The populated <code>UserProfileData</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
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
      if (data.hasOwnProperty('contactInformation')) {
        obj['contactInformation'] = ContactInformation.constructFromObject(data['contactInformation']);
      }
    }
    return obj;
  }


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

  /**
   * The age of the user in years.
   * @member {Number} age
   */
  exports.prototype['age'] = undefined;

  /**
   * The contact information of the user.
   * @member {module:model/ContactInformation} contactInformation
   */
  exports.prototype['contactInformation'] = undefined;




  return exports;
}));
