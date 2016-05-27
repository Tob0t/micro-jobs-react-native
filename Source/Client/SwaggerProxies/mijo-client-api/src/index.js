(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./ApiClient', './model/ApiError', './model/AuthorizationError', './model/ContactInformation', './model/Location', './model/Offer', './model/OfferData', './model/OfferInterest', './model/OfferRequest', './model/OffererInformation', './model/Payment', './model/ServerError', './model/TakerInformation', './model/UserProfileData', './api/OfferCreateApi', './api/OfferDetailsApi', './api/OfferEditApi', './api/OfferFeedApi', './api/UserApi', './api/YourOffersApi', './api/YourRequestsApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/ApiError'), require('./model/AuthorizationError'), require('./model/ContactInformation'), require('./model/Location'), require('./model/Offer'), require('./model/OfferData'), require('./model/OfferInterest'), require('./model/OfferRequest'), require('./model/OffererInformation'), require('./model/Payment'), require('./model/ServerError'), require('./model/TakerInformation'), require('./model/UserProfileData'), require('./api/OfferCreateApi'), require('./api/OfferDetailsApi'), require('./api/OfferEditApi'), require('./api/OfferFeedApi'), require('./api/UserApi'), require('./api/YourOffersApi'), require('./api/YourRequestsApi'));
  }
}(function(ApiClient, ApiError, AuthorizationError, ContactInformation, Location, Offer, OfferData, OfferInterest, OfferRequest, OffererInformation, Payment, ServerError, TakerInformation, UserProfileData, OfferCreateApi, OfferDetailsApi, OfferEditApi, OfferFeedApi, UserApi, YourOffersApi, YourRequestsApi) {
  'use strict';

  /**
   * API for MiJo clients..<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var MiJoClientApi = require('./index'); // See note below*.
   * var xxxSvc = new MiJoClientApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new MiJoClientApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['./index'], function(){...}) and put the application logic within the
   * callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new MiJoClientApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new MiJoClientApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 1.0.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The ApiError model constructor.
     * @property {module:model/ApiError}
     */
    ApiError: ApiError,
    /**
     * The AuthorizationError model constructor.
     * @property {module:model/AuthorizationError}
     */
    AuthorizationError: AuthorizationError,
    /**
     * The ContactInformation model constructor.
     * @property {module:model/ContactInformation}
     */
    ContactInformation: ContactInformation,
    /**
     * The Location model constructor.
     * @property {module:model/Location}
     */
    Location: Location,
    /**
     * The Offer model constructor.
     * @property {module:model/Offer}
     */
    Offer: Offer,
    /**
     * The OfferData model constructor.
     * @property {module:model/OfferData}
     */
    OfferData: OfferData,
    /**
     * The OfferInterest model constructor.
     * @property {module:model/OfferInterest}
     */
    OfferInterest: OfferInterest,
    /**
     * The OfferRequest model constructor.
     * @property {module:model/OfferRequest}
     */
    OfferRequest: OfferRequest,
    /**
     * The OffererInformation model constructor.
     * @property {module:model/OffererInformation}
     */
    OffererInformation: OffererInformation,
    /**
     * The Payment model constructor.
     * @property {module:model/Payment}
     */
    Payment: Payment,
    /**
     * The ServerError model constructor.
     * @property {module:model/ServerError}
     */
    ServerError: ServerError,
    /**
     * The TakerInformation model constructor.
     * @property {module:model/TakerInformation}
     */
    TakerInformation: TakerInformation,
    /**
     * The UserProfileData model constructor.
     * @property {module:model/UserProfileData}
     */
    UserProfileData: UserProfileData,
    /**
     * The OfferCreateApi service constructor.
     * @property {module:api/OfferCreateApi}
     */
    OfferCreateApi: OfferCreateApi,
    /**
     * The OfferDetailsApi service constructor.
     * @property {module:api/OfferDetailsApi}
     */
    OfferDetailsApi: OfferDetailsApi,
    /**
     * The OfferEditApi service constructor.
     * @property {module:api/OfferEditApi}
     */
    OfferEditApi: OfferEditApi,
    /**
     * The OfferFeedApi service constructor.
     * @property {module:api/OfferFeedApi}
     */
    OfferFeedApi: OfferFeedApi,
    /**
     * The UserApi service constructor.
     * @property {module:api/UserApi}
     */
    UserApi: UserApi,
    /**
     * The YourOffersApi service constructor.
     * @property {module:api/YourOffersApi}
     */
    YourOffersApi: YourOffersApi,
    /**
     * The YourRequestsApi service constructor.
     * @property {module:api/YourRequestsApi}
     */
    YourRequestsApi: YourRequestsApi
  };

  return exports;
}));
