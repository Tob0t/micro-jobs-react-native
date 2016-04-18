'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
import Card from './Card'
import Api from 'MiJo/app/Api'

// global vars
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
  TouchableOpacity,
} = React;

class HomeScene extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={GlobalStyle.container}>
        <Card style={{flex: 1}}/>
      </View>
    );


  }
}

var styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5,
    backgroundColor: 'transparent'
  },
  innerContainer: {
    flexDirection: 'column',
    flex: 0.05,
    backgroundColor: 'transparent',
    marginTop: 5
  },
})

export default HomeScene;
