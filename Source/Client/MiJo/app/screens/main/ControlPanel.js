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

var imageTemplate = 'data:image/png;base64,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';


class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prename: '',
      surname: '',
      mail: '',
      image: imageTemplate,
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
        console.error("Error:", error.error_description);
      });
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}
          contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.push({id:'UserSettings'})}>
          <View style={styles.profileContainer}>
            <Image style={styles.profilePicture} source={{uri: this.state.image}}/>
            <View style={styles.profileDataContainer}>
              <Text style={styles.profileName}>{this.state.prename} {this.state.surname}</Text>
              <Text style={styles.profileEmail}>{this.state.mail}</Text>
              </View>
          </View>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => this.props.navigator.push({id:'HomeScene'})}>
          <View style={styles.row}>
            <View style={styles.colIcon}>
              <IconFont name="gift" size={24}/>
            </View>
            <View style={styles.colText}>
              <Text style={styles.linkText}>MiJo's</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({id:'GeneralSettingsScene'})}>
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
