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
    root.MiJoClientApi.Location = factory(root.MiJoClientApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Location model module.
   * @module model/Location
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Location</code>.
   * A location on a WGS84 sphere. Represented by longitude and latitude.
   * @alias module:model/Location
   * @class
   * @param lon
   * @param lat
   */
  var exports = function(lon, lat) {
    var _this = this;

    _this['lon'] = lon;
    _this['lat'] = lat;
  };

  /**
   * Constructs a <code>Location</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Location} obj Optional instance to populate.
   * @return {module:model/Location} The populated <code>Location</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('lon')) {
        obj['lon'] = ApiClient.convertToType(data['lon'], 'Number');
      }
      if (data.hasOwnProperty('lat')) {
        obj['lat'] = ApiClient.convertToType(data['lat'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The longitude of the location.
   * @member {Number} lon
   */
  exports.prototype['lon'] = undefined;
  /**
   * The latitude of the location.
   * @member {Number} lat
   */
  exports.prototype['lat'] = undefined;




  return exports;
}));


