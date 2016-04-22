'use strict';

// imports
import MiJoAuthorizationApi from 'mijo-authorization-api'


var mockOffers = [
    {
      offerId: 567,
      img_url: 'http://www.autoserviceprices.com/wp-content/uploads/2015/02/car-repair-wrench.jpg',
      title: 'Repairing Car',
      interestedPeople: 3
    }
    ,{
      offerId: 123,
      img_url: 'http://i.telegraph.co.uk/multimedia/archive/02221/gardening_2221004b.jpg',
      title: 'Garding Work',
      interestedPeople: 1
    }
    ,{
      offerId: 476,
      img_url: 'http://custom-computers.com/wp-content/uploads/2014/06/computer-repair-now-3.jpg',
      title: 'Computer Support',
      interestedPeople: 2
    }
    ,{
      offerId: 333,
      img_url: 'http://cdn-image.myrecipes.com/sites/default/files/styles/420x420/public/image/recipes/su/09/05/buttercake-su-1891977-x.jpg?itok=7c4-_Tba',
      title: 'Baking Cake',
      interestedPeople: 3
    }
];

var mockRequests = [
    {
      offerId: 567,
      img_url: 'http://www.autoserviceprices.com/wp-content/uploads/2015/02/car-repair-wrench.jpg',
      title: 'Repairing Car',
      owner: 'Erwin S.'
    }
    ,{
      offerId: 123,
      img_url: 'http://i.telegraph.co.uk/multimedia/archive/02221/gardening_2221004b.jpg',
      title: 'Garding Work',
      owner: 'Sandra I.'
    }
    ,{
      offerId: 476,
      img_url: 'http://custom-computers.com/wp-content/uploads/2014/06/computer-repair-now-3.jpg',
      title: 'Computer Support',
      owner: 'Hannes M.'
    }
    ,{
      offerId: 333,
      img_url: 'http://cdn-image.myrecipes.com/sites/default/files/styles/420x420/public/image/recipes/su/09/05/buttercake-su-1891977-x.jpg?itok=7c4-_Tba',
      title: 'Baking Cake',
      owner: 'Hans F.'
    }
];

class Database {

  constructor() {
    // init connection to via api
    }

  getUserOffers(userId) {
    return mockOffers;
  }

  getUserRequests(userId) {
    return mockRequests;
  }

}


export default new Database();
