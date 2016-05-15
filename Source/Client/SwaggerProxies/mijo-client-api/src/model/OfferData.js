(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './Location', './Payment'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Location'), require('./Payment'));
  } else {
    // Browser globals (root is window)
    if (!root.MiJoClientApi) {
      root.MiJoClientApi = {};
    }
    root.MiJoClientApi.OfferData = factory(root.MiJoClientApi.ApiClient, root.MiJoClientApi.Location, root.MiJoClientApi.Payment);
  }
}(this, function(ApiClient, Location, Payment) {
  'use strict';

  /**
   * The OfferData model module.
   * @module model/OfferData
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>OfferData</code>.
   * Represents the data of an mirco job offer.
   * @alias module:model/OfferData
   * @class
   * @param title
   * @param description
   * @param deadline
   */
  var exports = function(title, description, deadline) {

    this['title'] = title;
    this['description'] = description;



    this['deadline'] = deadline;
  };

  /**
   * Constructs a <code>OfferData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OfferData} obj Optional instance to populate.
   * @return {module:model/OfferData} The populated <code>OfferData</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('location')) {
        obj['location'] = Location.constructFromObject(data['location']);
      }
      if (data.hasOwnProperty('payment')) {
        obj['payment'] = Payment.constructFromObject(data['payment']);
      }
      if (data.hasOwnProperty('deadline')) {
        obj['deadline'] = ApiClient.convertToType(data['deadline'], 'Date');
      }
    }
    return obj;
  }


  /**
   * The title of the offer.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;

  /**
   * The description of the offer.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;

  /**
   * The image of the offer as base64 string.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;

  /**
   * @member {module:model/Location} location
   */
  exports.prototype['location'] = undefined;

  /**
   * @member {module:model/Payment} payment
   */
  exports.prototype['payment'] = undefined;

  /**
   * The deadline of the offer.
   * @member {Date} deadline
   */
  exports.prototype['deadline'] = undefined;




  return exports;
}));
