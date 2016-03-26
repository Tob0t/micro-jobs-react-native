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
  TouchableOpacity,
} = React;

var globalStyle = require('./style.js');

var ForgotPassword = React.createClass({
  getInitialState: function() {
    return {
      email: '',
    }
  },
  render: function() {
    var TouchableElement = TouchableHighlight;
    if(Platform.OS === 'android'){
      TouchableElement = TouchableNativeFeedback;
    }
    return (
        <View style={globalStyle.container}>
            <Image style={globalStyle.bg} source={require('./img/login_bg.png')} />
            <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={this.props.navigator.pop}>
                <Image style={globalStyle.arrowBack} source={require('./img/login_back.png')}/>
            </TouchableOpacity>
              <View style={styles.header}>
                  <Text style={[globalStyle.whiteFont, styles.headline]}>Forgot Password</Text>
              </View>

              <View style={styles.inputs}>
                <View style={styles.instructions}>
                  <Text style={globalStyle.whiteFont}>Please type in your Email!</Text>
                </View>
                <View style={globalStyle.inputContainer}>
                    <Image style={globalStyle.inputEmail} source={require('./img/login_email.png')}/>
                    <TextInput
                        style={[globalStyle.input, globalStyle.whiteFont]}
                        placeholder="Email"
                        placeholderTextColor="#FFF"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                    />
                </View>
              </View>
              <TouchableElement
                onPress={this._handleResetPassword}>
                <View style={globalStyle.submit}>
                    <Text style={globalStyle.whiteFont}>Reset Password</Text>
                </View>
              </TouchableElement>

              <View style={globalStyle.bottomArea}>
                  <Text style={globalStyle.greyFont}>Don't have an account?
                    <Text style={globalStyle.whiteFont}
                      onPress={this._handleSignUp}>  Sign Up
                    </Text>
                  </Text>
              </View>
          </View>
        </View>
    );
  },
  _handleResetPassword(event){
    console.log('Reset Password pressed');
    console.log('Email: '+this.state.email)
  /*
    if(requestReminder(this.state.email) == true){
        this.props.navigator.push({
          id: 'SignIn'
        });
      }
  */
  },
  _handleSignUp(event){
    console.log('Sign Up pressed');
    this.props.navigator.replace({
      id: 'SignUp'
    });
  },

});

var styles = StyleSheet.create({
    innerContainer: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent',
      marginTop: 25
    },
    header: {
        flex: .2,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
    },
    headline: {
        fontSize: 28,
    },
    instructions: {
        padding: 10,
        marginLeft: 15,
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .5
    },
})


module.exports = ForgotPassword;
