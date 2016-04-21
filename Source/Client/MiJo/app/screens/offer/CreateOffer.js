'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
import MaterialButton from 'MiJo/app/components/buttons/MaterialButton'
import MK, {MKColor} from 'react-native-material-kit'



// global vars
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} = React;


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
            <MaterialButton text="Back" onPress={() => this.props.navigator.pop()} backgroundColor={MKColor.DeepPurple}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            
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
