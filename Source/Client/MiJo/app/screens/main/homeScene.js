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
  TouchableOpacity,
  Navigator
} = React;

import Card from './Card.js';
var globalStyle = require('./style.js');
var access_token;

class HomeScene extends React.Component{
  constructor(props){
    super(props);
    access_token = this.props.token.access_token;
  }
  render() {
    console.log("Received Data: "+access_token);
    console.log(this.props.token);
    var TouchableElement = TouchableHighlight;
    if(Platform.OS === 'android'){
      TouchableElement = TouchableNativeFeedback;

    }
    return (
      <View style={globalStyle.container}>
        <Image style={globalStyle.bg} source={require('./img/login_bg.png')} />
        <View style={styles.innerContainer}>
        <TouchableOpacity
            onPress={this.props.navigator.pop}>
              <Image style={globalStyle.arrowBack} source={require('./img/login_back.png')}/>
          </TouchableOpacity>
        </View>
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
      flex: 0.1,
      backgroundColor: 'transparent',
      marginTop: 25
    },
})

module.exports = HomeScene;
