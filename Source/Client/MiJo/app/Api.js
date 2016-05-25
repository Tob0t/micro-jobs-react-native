'use strict';

// imports
import MiJoAuthorizationApi from 'mijo-authorization-api'


class Api {

  constructor() {
    //Set the authorization for the APIs -> Just certain clients are allowed to make requests to the api
    this.apiClient = MiJoAuthorizationApi.ApiClient.instance;
    this.clientAuthentication = this.apiClient.authentications['Client Authentication'];
    this.clientAuthentication.username = 'MiJoAndroidClient';
    this.clientAuthentication.password = 'secret';

    this.tokenApi = new MiJoAuthorizationApi.TokenApi();

    this.grantType = "password"; // {String} The grant type. Should be password.
    this.mijoClientInstanceId = "SomeIdWhichIsUniqueForThisClientInstallation"; // {String} The client instance id which identifies the client of the user.
  }

  getKeyPairForUsernameAndPassword(username, password) {
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.tokenApi.getKeyPairForUsernameAndPassword(that.grantType, username, password, that.mijoClientInstanceId, (error, data, response) => {
        if (error) {
          reject(response.body);
        } else {
          resolve();
          that.token = data.access_token;
          // if successfull resolve promise with data
          // save token in instance variable in this.token
        }
      });
    });
    // return promise
    return p;
  }

  isLoggedIn() {
    return !!this.token; // only returns true or false
  }

  getKey(){
    return this.token;
  }
}



// Hack to get everytime the same api (Singleton)
let api;

export default () => {
  api = api || new Api();
  return api;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       