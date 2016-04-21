'use strict';

// imports
import React from 'react-native'
import MK, {MKProgress} from 'react-native-material-kit'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'
import MaterialFab from 'MiJo/app/components/buttons/MaterialFab'


// global vars
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
} = React;


class UserOffersScene extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <NavBarStandard title="Your Offers" onPress={() => this.props.navigator.pop()}/>
        <ScrollView style={styles.scrollView}
            contentContainerStyle={styles.container}>
          <View style={styles.row}>
            <View style={styles.col}>
               <MKProgress.Indeterminate
                style={styles.progress}
              />
              <Text style={styles.legendLabel}>UserOffersScene under construction</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );


  }
}

var styles = StyleSheet.create({
  scrollView:{
    flex: 1,
  },
  col: {
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
  },
  fab: {
    marginBottom : 5,
    marginRight : 5,
    alignSelf: 'flex-end'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  progress: {
    width: 150,
  },
})

export default UserOffersScene;
