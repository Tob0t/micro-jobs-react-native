'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Navigator
} = React;

var globalStyle = require('./style.js');

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    var TouchableElement = TouchableHighlight;
    if(Platform.OS === 'android'){
      TouchableElement = TouchableNativeFeedback;

    }
    return (
        <View style={globalStyle.container}>
            <Image style={globalStyle.bg} source={require('./img/login_bg.png')} />
            <View style={styles.header}>
                <Image style={styles.mark} source={require('./img/login_mask.png')} />
            </View>
            <View style={styles.inputs}>
                <View style={globalStyle.inputContainer}>
                    <Image style={globalStyle.inputUsername} source={require('./img/login_person.png')}/>
                    <TextInput
                        style={[globalStyle.input, globalStyle.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        value={this.state.username}
                        onChangeText={(username) => this.setState({username})}
                        underlineColorAndroid="rgba(0,0,0,0)"
                    />
                </View>
                <View style={globalStyle.inputContainer}>
                    <Image style={globalStyle.inputPassword} source={require('./img/login_lock.png')}/>
                    <TextInput
                        password={true}
                        style={[globalStyle.input, globalStyle.whiteFont]}
                        placeholder="Password"
                        placeholderTextColor="#FFF"
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={globalStyle.greyFont}
                      onPress={() => this._handleForgotPassword()}>Forgot Password</Text>
                </View>
            </View>
            <TouchableElement
              onPress={() => this._handleSignIn()}>
              <View style={globalStyle.submit}>
                  <Text style={globalStyle.whiteFont}>Sign In</Text>
              </View>
            </TouchableElement>

            <View style={globalStyle.bottomArea}>
                <Text style={globalStyle.greyFont}>Don't have an account?
                  <Text style={globalStyle.whiteFont}
                    onPress={() => this._handleSignUp()}>  Sign Up
                  </Text>
                </Text>
            </View>
        </View>
    );
  }
  _handleSignIn(event){
    console.log('Sign In pressed');
    console.log(this.props.tokenApi);
    var nav = this.props.navigator;

    var tokenApi = this.props.tokenApi;
    var grantType = "password"; // {String} The grant type. Should be password.
    var username = this.state.username; // {String} The email of the user.
    var password = this.state.password; // {String} The password of the user.
    var mijoClientInstanceId = "SomeIdWhichIsUniqueForThisClientInstallation"; // {String} The client instance id which identifies the client of the user.

    console.log("Captured Username: "+username);
    console.log("Captured Password: "+password);

    // MOCK DATA
    username = "tom.wimmer@hotmail.com";
    password = "password";

    console.log("Mock Username: "+username);
    console.log("Mock Password: "+password);

    tokenApi.getKeyPairForUsernameAndPassword(grantType, username, password, mijoClientInstanceId, function (error, data, response) {
      if (error) {
          console.log("Error: ");
          console.error(error);
      } else {
        console.log("Success: ");
        console.log(data);
        nav.push({
          id: 'HomeScene',
          token: data,
        })
      }
    });

  }
  _handleSignUp(){
    console.log('Sign Up pressed');
    this.props.navigator.push({
      id: 'SignUp'
    });
  }
  _handleForgotPassword(event){
    console.log('Forgot Password pressed');
    this.props.navigator.push({
      id: 'ForgotPassword'
    });
  }

}

var styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
});

module.exports = SignIn;
