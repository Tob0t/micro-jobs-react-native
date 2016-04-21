'use strict';

// imports
import React from 'react-native';

// global vars
var {
  Platform,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
} = React;

const Button = ({
  text,
  textStyle,
  onPress
}) => {
  return(
    <TouchableOpacity
      onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
};

Button.PropTypes = {
  textStyle: PropTypes.style,
  text: PropTypes.string,
  onPress: PropTypes.func
}




  

export default Button;