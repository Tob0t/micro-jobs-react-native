'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
import MK, {MKColor} from 'react-native-material-kit'
import IconOct from 'react-native-vector-icons/Octicons'
import IconFont from 'react-native-vector-icons/FontAwesome'
import Api from 'MiJo/app/Api'
import ClientApi from 'MiJo/app/ClientApi'



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
    this.state = {
      prename: '',
      surname: '',
      mail: '',
      image: '',
      loaded: false,
      }
  }

  componentDidMount(){
    this._getUserProfile();
  }

  componentWillReceiveProps() {
    this._getUserProfile();
  }

  _getUserProfile(){
    ClientApi().getUserProfile().then(
      (user) => {
        console.log('Successfully got the user: ', user);
        // Initiate new rendering
        this.setState({
          prename: user.prename,
          surname: user.surname,
          mail: user.contactInformation.mail,
          image: user.image,
          loaded: true,
        });
      },(error) => {
        debugger
        console.error("Error:", error.error_description);
        Alert.alert(
          'Error',
          error.error_description);
      });
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}
          contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.profilePicture} source={{uri: this.state.image}}/>
          <View style={styles.profileDataContainer}>
            <Text style={styles.profileName}>{this.state.prename} {this.state.surname}</Text>
            <Text style={styles.profileEmail}>{this.state.mail}</Text>
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
        <TouchableOpacity onPress={() => {
          this.props.navigator.resetTo({id:'Logout'});
          Api().logout();
          }
        }>
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
    paddingLeft: 10
  },
  profilePicture:{
    //resizeMode: 'contain',
    width: 50,
    height: 50,
    borderRadius: 25,
    //flex: 1,
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
