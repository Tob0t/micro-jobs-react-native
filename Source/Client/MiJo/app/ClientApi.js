'use strict';

// imports
import MiJoClientApi from 'mijo-client-api'
import Api from 'MiJo/app/Api'


class ClientApi {

  constructor() {

    // Set the access token --> must only be done once
    this.apiClient = MiJoClientApi.ApiClient.instance;
    this.clientAuthentication = this.apiClient.authentications['MiJo API Key'];
    this.clientAuthentication.apiKeyPrefix = "Bearer";
    //this.clientAuthentication.apiKey = keyFromAuth;

    this.OfferFeedApi = new MiJoClientApi.OfferFeedApi();
    this.OfferCreateApi = new MiJoClientApi.OfferCreateApi();
    this.YourOffersApi = new MiJoClientApi.YourOffersApi();
    this.YourRequestsApi = new MiJoClientApi.YourRequestsApi();
    this.UserApi = new MiJoClientApi.UserApi();
    this.OfferDetailsApi = new MiJoClientApi.OfferDetailsApi();
    this.OfferEditApi = new MiJoClientApi.OfferEditApi();

  }

  setToken(token){
    this.clientAuthentication.apiKey = token;
  }

  createOffer(offer) {
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.OfferCreateApi.createOffer(offer, (error, data, response) => {
        if (error) {
          //debugger
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


  getOffers(lat,lon, max_distance, opts) {
    var that = this;
    console.log("current api-key:", this.clientAuthentication.apiKey);

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.OfferFeedApi.getOffers(lat, lon, max_distance, opts, (error, data, response) => {
        if (error) {
          //debugger
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
      that.OfferFeedApi.createUpVote(offerId, (error, data, response) => {
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
      that.OfferFeedApi.createDownVote(offerId, (error, data, response) => {
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

  getOfferInterests(opts){
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.YourOffersApi.getOfferInterests(opts, (error, data, response) => {
        if (error) {
          //debugger
          reject(error);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    });
    // return promise
    return p;
  }
  createMatch(offerId, userId){
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.YourOffersApi.createMatch(offerId, userId, (error, data, response) => {
        if (error) {
          //debugger
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    // return promise
    return p;
  }

  declineUserForOffer(offerId, userId){
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.YourOffersApi.declineUserForOffer(offerId, userId, (error, data, response) => {
        if (error) {
          //debugger
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    // return promise
    return p;
  }

  getMatchedRequests(opts){
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.YourRequestsApi.getMatchedRequests(opts, (error, data, response) => {
        if (error) {
          //debugger
          reject(error);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    });
    // return promise
    return p;
  }

  getUserProfile(){
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.UserApi.getUserProfile((error, data, response) => {
        if (error) {
          //debugger
          reject(error);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    });
    // return promise
    return p;
  }
  updateUserProfile(userProfile){
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.UserApi.updateUserProfile(userProfile,(error, data, response) => {
        if (error) {
          //debugger
          reject(error);
        } else {
          resolve();
        }
      });
    });
    // return promise
    return p;
  }

  getOffer(offerId){
    var that = this;
    console.log(offerId);

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.OfferDetailsApi.getOffer(offerId,(error, data, response) => {
        if (error) {
          reject(error);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    });
    // return promise
    return p;
  }

  updateOffer(id, offer) {
    var that = this;

    // create promise
    var p = new Promise(function (resolve, reject) {
      that.OfferEditApi.updateOffer(id, offer, (error, data, response) => {
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
