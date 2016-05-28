'use strict';

// imports
import React from 'react-native'
import MK, {MKButton, MKColor} from 'react-native-material-kit'

// global vars
var {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const MaterialButton = ({
  text,
  onPress,
  backgroundColor,
}) => {
  const ColoredRaisedButton = new MKButton.coloredButton()
      .build();
  return(
    <ColoredRaisedButton
      onPress={onPress}
      backgroundColor={backgroundColor}>
      <View>
        <Text>{text}</Text>
      </View>
    </ColoredRaisedButton>
  )
};

MaterialButton.PropTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.text,
}

MaterialButton.defaultProps = {
  text: 'Button',
  backgroundColor: MKColor.Green,
}


var styles = StyleSheet.create({
});

export default MaterialButton;
