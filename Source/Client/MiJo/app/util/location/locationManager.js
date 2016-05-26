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

      var curLoc = JSON.stringify({ lat: this.latitude, lng: this.longitude }, null, '\t');
      console.log("curLoc: " + curLoc);
    });

    console.log("hellow world - " + this.lastPosition);

    var curLoc = JSON.stringify({ lat: this.latitude, lng: this.longitude }, null, '\t');
    console.log("curLoc: " + curLoc);

    return curLoc;
  }
}

export { LocationManager };
