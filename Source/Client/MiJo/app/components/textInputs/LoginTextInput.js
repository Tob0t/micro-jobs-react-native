'use strict';

// imports
import React from 'react-native';

// global vars
var {
  Navigator,
  Platform,
  PropTypes,
  StyleSheet,
  TextInput,
  View,
} = React;

const LoginTextInput = ({
  password,
  placeholder,
  value,
  onChangeText
}) =>{
  return(
    <TextInput
        password={password}
        style={[styles.input, styles.whiteFont]}
        placeholder={placeholder}
        placeholderTextColor='#FFF'
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid='rgba(0,0,0,0)'
    />
  )
};

LoginTextInput.PropTypes = {
  password: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func
}

var styles = StyleSheet.create({
  input: {
      position: 'absolute',
      left: 61,
      top: 12,
      //top: (Platform.OS === 'android') ? 6 : 12,
      right: 0,
      height: 20,
      //height: (Platform.OS === 'android') ? 35 : 20,
      fontSize: 14,
  },
  whiteFont: {
    color: '#FFF'
  }
});

export default LoginTextInput;
