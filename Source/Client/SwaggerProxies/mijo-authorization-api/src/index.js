(function (factory) {
    var base64 = require('base-64');
	btoa = base64.encode;
	atob = base64.decode;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./ApiClient', './model/KeyPair', './model/OAuthError', './model/ServerError', './api/TokenApi'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS-like environments that support module.exports, like Node.
        module.exports = factory(require('./ApiClient'), require('./model/KeyPair'), require('./model/OAuthError'), require('./model/ServerError'), require('./api/TokenApi'));
    }
}(function (ApiClient, KeyPair, OAuthError, ServerError, TokenApi) {
    'use strict';

    /**
     * Authorization API for MiJo. Conform with OAuth 2.0 (RFC 6749).<br>
     * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
     * <p>
     * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
     * <pre>
     * var MiJoAuthorizationApi = require('./index'); // See note below*.
     * var xxxSvc = new MiJoAuthorizationApi.XxxApi(); // Allocate the API class we're going to use.
     * var yyyModel = new MiJoAuthorizationApi.Yyy(); // Construct a model instance.
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
     * var xxxSvc = new MiJoAuthorizationApi.XxxApi(); // Allocate the API class we're going to use.
     * var yyy = new MiJoAuthorizationApi.Yyy(); // Construct a model instance.
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
         * The KeyPair model constructor.
         * @property {module:model/KeyPair}
         */
        KeyPair: KeyPair,
        /**
         * The OAuthError model constructor.
         * @property {module:model/OAuthError}
         */
        OAuthError: OAuthError,
        /**
         * The ServerError model constructor.
         * @property {module:model/ServerError}
         */
        ServerError: ServerError,
        /**
         * The TokenApi service constructor.
         * @property {module:api/FacebookApi}
         */
        TokenApi: TokenApi,
    };

    return exports;
}));
