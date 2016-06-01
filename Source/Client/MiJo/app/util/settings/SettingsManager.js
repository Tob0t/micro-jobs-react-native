'use strict';


class SettingsManager {

  constructor() {
    this.offers = {
      'maxDistance': 200000,
      'category': 'garden'
    };
  }

  getOffers() {
    return this.offers;
  }

  updateSettings(newSettings){
    this.offers = newSettings.offers;
  }
}




// Hack to get everytime the same api (Singleton)
let settingsManager;

export default () => {
  settingsManager = settingsManager || new SettingsManager();
  return settingsManager;
}
