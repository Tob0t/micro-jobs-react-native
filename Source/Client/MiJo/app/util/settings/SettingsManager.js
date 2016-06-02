'use strict';


class SettingsManager {

  constructor() {
    this.requests = {
      'maxDistance': 200000,
      'category': 'garden',
      'type': 'money/service'
    };
    this.offers = {
      'minimumAge': 18,
      'maximumAge': 70
    };
  }

  getOffers() {
    return this.offers;
  }
  getRequests() {
    return this.requests;
  }

  updateSettings(newSettings){
    this.offers = newSettings.offers;
    this.requests = newSettings.requests;
  }
}




// Hack to get everytime the same api (Singleton)
let settingsManager;

export default () => {
  settingsManager = settingsManager || new SettingsManager();
  return settingsManager;
}
