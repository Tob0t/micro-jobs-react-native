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
    root.MiJoClientApi.ContactInformation = factory(root.MiJoClientApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ContactInformation model module.
   * @module model/ContactInformation
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>ContactInformation</code>.
   * Represents contact information of an user.
   * @alias module:model/ContactInformation
   * @class
   * @param mail
   */
  var exports = function(mail) {

    this['mail'] = mail;

  };

  /**
   * Constructs a <code>ContactInformation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContactInformation} obj Optional instance to populate.
   * @return {module:model/ContactInformation} The populated <code>ContactInformation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('mail')) {
        obj['mail'] = ApiClient.convertToType(data['mail'], 'String');
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
      }
    }
    return obj;
  }


  /**
   * The e-mail of the user.
   * @member {String} mail
   */
  exports.prototype['mail'] = undefined;

  /**
   * The phone number of the user.
   * @member {String} phone
   */
  exports.prototype['phone'] = undefined;




  return exports;
}));
