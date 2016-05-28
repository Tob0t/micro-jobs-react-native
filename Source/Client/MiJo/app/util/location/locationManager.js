'use strict';


var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

class LocationManager {

  static getLastKnownLocation() {

    console.log("getLastKnownLocation entered");

    navigator.geolocation.getCurrentPosition(
    (position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;

        this.lastPosition = position;

    },
    (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      //var lastPosition = JSON.stringify(position);
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;

      this.lastPosition = position;

      //var curLoc = JSON.stringify({ lat: this.latitude, lng: this.longitude }, null, '\t');
      //console.log("curLoc: " + curLoc);
    });

    var curLoc = JSON.stringify({ lat: this.latitude, lng: this.longitude }, null, '\t');
    //console.log("curLoc: " + curLoc);

    return this.lastPosition;
  }

  static getLastKnownLocationPromise() {
    var that = this;

    console.log("getLastKnownLocationPromise entered");

    //create Promise
    var p = new Promise(function(resolve,reject){
      navigator.geolocation.getCurrentPosition(
      (position) => {
          /*that.watchID = navigator.geolocation.watchPosition((position) => {
            //var lastPosition = JSON.stringify(position);
            that.longitude = position.coords.longitude;
            that.latitude = position.coords.latitude;

            that.lastPosition = position;

            //var curLoc = JSON.stringify({ lat: this.latitude, lng: this.longitude }, null, '\t');
            //console.log("curLoc: " + curLoc);
          });*/
          resolve(position);

      }, (error) => {
        reject(error);
      },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    });
    return p;
  }
}

export { LocationManager };
