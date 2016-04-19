'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
import MK from 'react-native-material-kit';



// global vars
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Platform,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} = React;

const {
  MKButton,
  MKColor,
} = MK;


/*const ColoredRaisedButton = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();*/

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}
                  contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <ColoredRaisedButton />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>

            <Text style={styles.legendLabel}>Raised button</Text>
          </View>
        </View>
      </ScrollView>
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
  buttonText: {
   fontSize: 14,
   fontWeight: 'bold',
   color: 'white',
 },
})

export default CreateOffer;
