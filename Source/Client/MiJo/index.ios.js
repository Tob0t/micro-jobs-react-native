/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Card from './Card.js';

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


class MiJo extends Component {
  render() {
    /*
    tokenApi.getKeyPairForUsernameAndPassword(grantType, username, password, mijoClientInstanceId, function (error, data, response) {
      if (error) {
          console.error(error);
      } else {
          console.log(data);
      }
    });
    */
    return (
      <Card style={{flex: 1}} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MiJo', () => MiJo);
