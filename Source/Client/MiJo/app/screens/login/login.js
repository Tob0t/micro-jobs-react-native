'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Navigator,
  BackAndroid,
} = React;

import SignIn from './signIn.js'
import SignUp from './signUp.js'
import ForgotPassword from './forgotPassword.js'

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  render: function() {
  /*  <Navigator renderScene={(route,nav) =>
      {return this.renderScene(route,nav)}}
    />
  },

  renderScene: function(route,nav){
    switch(route.id){
      case "Signin":
        return <Signin navigator={this.props.navigator}/>
      case "Signup":
          return <Signup navigator={nav}/>
    }
  }
  */

    return (
      <Navigator
          initialRoute={{id:'SignIn'}}
          renderScene={this.renderScene}/>
    );
  },
  renderScene: function(route, nav){
    _navigator = nav;
    switch(route.id){
      case 'SignIn':
        return <SignIn navigator={nav}/>
      case 'SignUp':
          return <SignUp navigator={nav}/>
      case 'ForgotPassword':
          return <ForgotPassword navigator={nav}/>
    }
  }
});

var styles = StyleSheet.create({
})


module.exports = Login;
