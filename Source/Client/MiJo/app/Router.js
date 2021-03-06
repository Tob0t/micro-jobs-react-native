'use strict';

// imports
import React from 'react-native'
import SignIn from 'MiJo/app/screens/login/SignIn'
import SignUp from 'MiJo/app/screens/login/SignUp'
import ForgotPassword from 'MiJo/app/screens/login/ForgotPassword'
import HomeScene from 'MiJo/app/screens/main/HomeScene'
import CreateOffer from 'MiJo/app/screens/offer/CreateOffer'
import EditOffer from 'MiJo/app/screens/offer/EditOffer'
import DetailOffer from 'MiJo/app/screens/offer/DetailOffer'
import UserOffersScene from 'MiJo/app/screens/user/UserOffersScene'
import UserRequestsScene from 'MiJo/app/screens/user/UserRequestsScene'
import UserSettingsScene from 'MiJo/app/screens/user/UserSettingsScene'
import GeneralSettingsScene from 'MiJo/app/screens/user/GeneralSettingsScene'
import Api from './Api'

// global vars
const {
  BackAndroid,
} = React;

export default class Router extends React.Component{
  constructor(props){
    super(props);
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if(props.navigator.getCurrentRoutes().length === 1){
          return false;
        }
        props.navigator.pop();
        return true;
      });
    }

  render() {
    const {id, navigator} = this.props;
    const guardedScences = ['HomeScene', 'CreateOffer', 'UserOffersScene',
     'UserRequestsScene', 'UserSettingsScene', 'GeneralSettingsScene', 'CreateOffer', 'EditOffer', 'DetailOffer'];

    // check if user is allowed to view scene otherwise return to SignIn Page
    if(!Api().isLoggedIn() && guardedScences.indexOf(id) > -1) {
      return <SignIn navigator={navigator}/>
    }
    switch(id){
        case 'SignIn':
          return <SignIn navigator={navigator}/>
        case 'Logout':
          return <SignIn navigator={navigator}/>
        case 'SignUp':
            return <SignUp navigator={navigator}/>
        case 'ForgotPassword':
            return <ForgotPassword navigator={navigator}/>
        case 'HomeScene':
            return <HomeScene navigator={navigator}/>
        case 'CreateOffer':
            return <CreateOffer navigator={navigator}/>
        case 'UserOffers':
            return <UserOffersScene navigator={navigator}/>
        case 'UserRequests':
            return <UserRequestsScene navigator={navigator}/>
        case 'UserSettings':
            return <UserSettingsScene navigator={navigator}/>
        case 'GeneralSettingsScene':
            return <GeneralSettingsScene navigator={navigator}/>
        case 'CreateOffer':
            return <CreateOffer navigator={navigator}/>
        case 'EditOffer':
            return <EditOffer navigator={navigator} offerId={this.props.offerId}/>
        case 'DetailOffer':
            return <DetailOffer navigator={navigator} offerId={this.props.offerId}/>
        default:
            return <SignIn navigator={navigator}/>
      }
  }
}
