'use strict';

// imports
import React from 'react-native'
import MK, {MKProgress} from 'react-native-material-kit'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'



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


class UserRequestsScene extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <NavBarStandard title="Your Requests" onPress={() => this.props.navigator.pop()}/>
        <ScrollView style={styles.scrollView}
            contentContainerStyle={styles.container}>
          <View style={styles.row}>
            <View style={styles.col}>
               <MKProgress.Indeterminate
                style={styles.progress}
              />
              <Text style={styles.legendLabel}>UserRequestsScene under construction</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );


  }
}

var styles = StyleSheet.create({
  col: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 10
  },
  progress: {
    width: 150,
  },
})

export default UserRequestsScene;
