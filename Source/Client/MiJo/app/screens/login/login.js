'use strict';

// imports
import React from 'react-native';
import SignIn from './signIn.js'
import SignUp from './signUp.js'
import ForgotPassword from './forgotPassword.js'
import HomeScene from '../main/homeScene.js'

// global vars
var {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Navigator,
  BackAndroid,
} = React;

var MiJoAuthorizationApi = require('mijo-authorization-api');

//Set the authorization for the APIs -> Just certain clients are allowed to make requests to the api
var apiClient = MiJoAuthorizationApi.ApiClient.instance;
var clientAuthentication = apiClient.authentications['Client Authentication'];
clientAuthentication.username = 'MiJoAndroidClient';
clientAuthentication.password = 'secret';

var tokenApi = new MiJoAuthorizationApi.TokenApi();

var grantType = "password"; // {String} The grant type. Should be password.
var username = "tom.wimmer@hotmail.com"; // {String} The email of the user.
var password = "password"; // {String} The password of the user.
var mijoClientInstanceId = "SomeIdWhichIsUniqueForThisClientInstallation"; // {String} The client instance id which identifies the client of the user.

// For navigation purpose
var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

class Login extends React.Component{
  constructor(props){
    super(props);
  }
  render() {

    return (
      <Navigator
          initialRoute={{id:'SignIn'}}
          renderScene={this.renderScene}/>
    );
  }
  renderScene(route, nav){
    _navigator = nav;
    switch(route.id){
      case 'SignIn':
        return <SignIn navigator={nav} tokenApi={tokenApi}/>
      case 'SignUp':
          return <SignUp navigator={nav}/>
      case 'ForgotPassword':
          return <ForgotPassword navigator={nav}/>
      case 'HomeScene':
          return <HomeScene navigator={nav} token={route.token}/>
    }
  }
}

var styles = StyleSheet.create({
})


export default Login;
