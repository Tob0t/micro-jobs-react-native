'use strict';

// imports
import React from 'react-native';
import MK from 'react-native-material-kit';

// global vars
var {
  Navigator,
  Platform,
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} = React;

const {
  MKButton,
  MKColor,
} = MK;

var TouchableElement = TouchableHighlight;
if(Platform.OS === 'android'){
  TouchableElement = TouchableNativeFeedback;
}

const MaterialButton = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();

var styles = StyleSheet.create({
    submit: {
        backgroundColor: '#FCA600',
        padding: 20,
        alignItems: 'center'
    },
    whiteFont: {
      color: '#FFF'
    }
});

export default MaterialButton;
