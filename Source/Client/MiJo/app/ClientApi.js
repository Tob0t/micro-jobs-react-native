'use strict';

// imports
import MiJoClientApi from 'mijo-client-api'
import Api from 'MiJo/app/Api'


class ClientApi {

  constructor() {

    // get key from AuthorizationApi
    var keyFromAuth = Api().getKey();

    // Set the access token --> must only be done once
    this.apiClient = MiJoClientApi.ApiClient.instance;
    this.clientAuthentication = this.apiClient.authentications['MiJo API Key'];
    this.clientAuthentication.apiKeyPrefix = "Bearer";
    this.clientAuthentication.apiKey = keyFromAuth;

    this.feedApi = new MiJoClientApi.OfferFeedApi();

  }

  getOffers(lat,lon, max_distance, opts) {
    var that = this;
    console.log(opts);

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.feedApi.getOffers(lat, lon, max_distance, opts, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          //This is the linking header with the pagination information
          console.log(response.headers['link']);
          //if first and prev are returned - there is a previous page
          //if last and next are returned - there is a next page
          //if no linking header is returned at all - just one page
          console.log(data);
          resolve(data);
        }
      });
    });
    // return promise
    return p;
  }

  createUpVote(offerId){
    var that = this;

     // create promise
    var p = new Promise(function (resolve, reject) {
      that.feedApi.createUpVote(offerId, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          console.log("Response code", response.status);
          resolve();
        }
      });
    });
    // return promise
    return p;
  }

  createDownVote(offerId){
    var that = this;

     // create promise
    var p = new Promise(function (resolve, reject) {
      that.feedApi.createDownVote(offerId, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          console.log("Response code", response.status);
          resolve();
        }
      });
    });
    // return promise
    return p;
  }

}


// Hack to get everytime the same api (Singleton)
let api;

export default () => {
  api = api || new ClientApi();
  return api;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       