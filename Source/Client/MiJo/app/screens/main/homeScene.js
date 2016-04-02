'use strict';

// imports
import React from 'react-native';
import GlobalStyle from './GlobalStyle.js';
import Card from './Card.js';

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
  Navigator
} = React;

var access_token;

class HomeScene extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      accessToken: this.props.token.access_token
    };
  }
  render() {
    console.log("Received Data: "+this.state.accessToken);
    console.log(this.props.token);

    return (
      <View style={GlobalStyle.container}>
        <Card style = {{flex: 1}} />
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
