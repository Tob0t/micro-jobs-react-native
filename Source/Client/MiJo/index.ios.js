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

import App from './app/App'

class MiJo extends Component {
  render() {

    return (
      <App />
    );
  }
}

const styles = StyleSheet.create({
});


AppRegistry.registerComponent('MiJo', () => MiJo);
