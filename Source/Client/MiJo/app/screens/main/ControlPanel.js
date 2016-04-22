'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
import MK, {MKColor} from 'react-native-material-kit'
import IconOct from 'react-native-vector-icons/Octicons'
import IconFont from 'react-native-vector-icons/FontAwesome'



// global vars
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} = React;


class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}
          contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.profilePicture} source={require('./img/example_user.png')}/>
          <View style={styles.profileDataContainer}>
            <Text style={styles.profileName}>Max Mustermann</Text>
            <Text style={styles.profileEmail}>max.muster@example.com</Text>
            </View>
        </View>
        <TouchableOpacity onPress={() => this.props.navigator.push({id:'UserOffers'})}>
          <View style={styles.row}>
            <View style={styles.colIcon}>
              <IconOct name="clippy" size={24}/>
            </View>
            <View style={styles.colText}>
              <Text style={styles.linkText}>Your offers</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({id:'UserRequests'})}>
          <View style={styles.row}>
            <View style={styles.colIcon}>
              <IconFont name="briefcase" size={24}/>
            </View>
            <View style={styles.colText}>
              <Text style={styles.linkText}>Your requests</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({id:'UserSettings'})}>
          <View style={styles.row}>
            <View style={styles.colIcon}>
              <IconFont name="wrench" size={24}/>
            </View>
            <View style={styles.colText}>
              <Text style={styles.linkText}>Settings</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({id:'Logout'})}>
          <View style={styles.row}>
            <View style={styles.colIcon}>
              <IconFont name="sign-out" size={24}/>
            </View>
            <View style={styles.colText}>
              <Text style={styles.linkText}>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );


  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'orange',
    alignItems: 'center',
    height: 120,
    paddingTop : 20,
  },
  profilePicture:{
    resizeMode: 'contain',
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
    justifyContent: 'center',
  },
  profileDataContainer: {
    flex: 3,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileName:{
    fontSize: 20,
  },
  profileEmail:{
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    justifyContent : 'flex-start',
  },
  colIcon: {
    flex: 1,
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    tintColor: '#5ac8fa',
  },
  colText: {
    flex: 5,
  },
  linkText: {
    fontSize: 18,
  },
  
})

export default ControlPanel;
