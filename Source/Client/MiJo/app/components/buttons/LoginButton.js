'use strict';

// imports
import React from 'react-native';

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

var TouchableElement = TouchableHighlight;
if(Platform.OS === 'android'){
  TouchableElement = TouchableNativeFeedback;
}

const LoginButton = ({
  text,
  onPress
}) =>{
  return(
    <TouchableElement
      onPress={onPress}>
      <View style={styles.submit}>
          <Text style={styles.whiteFont}>{text}</Text>
      </View>
    </TouchableElement>
  )
};

LoginButton.PropTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
}

var styles = StyleSheet.create({
    submit: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    whiteFont: {
      color: '#FFF'
    }
});

export default LoginButton;
