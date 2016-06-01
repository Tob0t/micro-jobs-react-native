'use strict';

class LocationGPSManager {

	constructor(){
		var coords = {
			'latitude': 48.346371,
           	'longitude': 14.510034	
		};

		this.lastPosition ={
			'coords': coords,
			'found': false
		};
	}


	getLastKnownLocationPromise() {
		var that = this;


		console.log("getLastKnownLocationPromise entered");
		//create Promise
		var p = new Promise(function(resolve,reject){
			console.log("enter promise", that.lastPosition);
			if(that.lastPosition.found){
				console.log("las position found");
				resolve(that.getLastPosition());
			} else{
				navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve(position);
				}, (error) => {
					that.watchID = navigator.geolocation.watchPosition((position) => {
				  	that.lastPosition = position;
				  	that.lastPosition.found = true;
				  	resolve(position);
				},(error) => {
				  reject(error);
				});

				//reject(error);
				},
					{enableHighAccuracy: true, timeout: 1000, maximumAge: 1000}
				);
			}
		});
		return p;
	}

	getLastPosition(){
		return this.lastPosition;
	}

  
}


// Hack to get everytime the same api (Singleton)
let locationGPSManager;

export default () => {
  locationGPSManager = locationGPSManager || new LocationGPSManager();
  return locationGPSManager;
}