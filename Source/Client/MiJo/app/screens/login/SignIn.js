'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
import Api from 'MiJo/app/Api'
import LoginButton from 'MiJo/app/components/buttons/LoginButton'
import LoginTextInput from 'MiJo/app/components/textInputs/LoginTextInput'

// global vars
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} = React;

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={GlobalStyle.container}>
        <Image style={GlobalStyle.bg} source={require('./img/login_bg.png')}/>
        <View style={styles.header}>
          <Image style={styles.mark} source={require('./img/logo.png')}/>
        </View>
        <View style={styles.inputs}>
          <View style={GlobalStyle.inputContainer}>
            <Image style={GlobalStyle.inputUsername} source={require('./img/login_person.png')}/>
            <LoginTextInput
              placeholder='Username'
              value={this.state.username}
              onChangeText={(username) => this.setState({username})}
            />
          </View>
          <View style={GlobalStyle.inputContainer}>
            <Image style={GlobalStyle.inputPassword} source={require('./img/login_lock.png')}/>
            <LoginTextInput
              password={true}
              placeholder='Password'
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <View style={styles.forgotContainer}>
            <Text style={GlobalStyle.greyFont}
                  onPress={() => this._handleForgotPassword()}>Forgot Password</Text>
          </View>
        </View>
        <LoginButton onPress={() => this._handleSignIn()} text="Sign in"/>

        <View style={GlobalStyle.bottomArea}>
          <Text style={GlobalStyle.greyFont}>Don't have an account?
            <Text style={GlobalStyle.whiteFont}
                  onPress={() => this._handleSignUp()}> Sign Up
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  _handleSignIn() {
    console.log('Sign In pressed');

    console.log("Captured Username: " + this.state.username);
    console.log("Captured Password: " + this.state.password);

    // MOCK DATA
    let username = "tom.wimmer@hotmail.com";
    let password = "password";

    console.log("Mock Username: " + username);
    console.log("Mock Password: " + password);

    Api().getKeyPairForUsernameAndPassword(username, password).then(
      () => {
        this.props.navigator.push({
          id: 'HomeScene',
        })
      }, (error) => {
        console.log("Error", error);
      });
  }

  _handleSignUp() {
    console.log('Sign Up pressed');
    this.props.navigator.push({
      id: 'SignUp'
    });
  }

  _handleForgotPassword(event) {
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

export default SignIn;
