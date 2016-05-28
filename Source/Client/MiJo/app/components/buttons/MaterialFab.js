'use strict';

// imports
import React from 'react-native'
import MK, {MKButton, MKColor} from 'react-native-material-kit'
import Icon from 'react-native-vector-icons/Ionicons'

// global vars
var {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const MaterialFab = ({
  onPress,
  backgroundColor,
}) => {
  const ColoredFab = new MKButton.coloredFab()
      .build();
  return(
    <ColoredFab
      onPress={onPress}
      backgroundColor={backgroundColor}>
      <Icon name="plus-round" size={25}/>
    </ColoredFab>
  )
};

MaterialFab.PropTypes = {
  onPress: PropTypes.func,
  backgroundColor: PropTypes.text,
}

MaterialFab.defaultProps = {
  backgroundColor: MKColor.Blue,
}


var styles = StyleSheet.create({
});

export default MaterialFab;
