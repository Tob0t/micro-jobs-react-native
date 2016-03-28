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

import Login from './app/screens/login/login.js'

class MiJo extends Component {
  render() {

    return (
      <Login />
    );
  }
}

const styles = StyleSheet.create({
});


AppRegistry.registerComponent('MiJo', () => MiJo);
