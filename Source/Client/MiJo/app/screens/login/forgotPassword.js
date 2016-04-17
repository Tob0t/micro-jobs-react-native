'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
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
  TouchableOpacity,
} = React;

class ForgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
    };
  }
  render() {
    return (
        <View style={GlobalStyle.container}>
            <Image style={GlobalStyle.bg} source={require('./img/login_bg.png')} />
            <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={this.props.navigator.pop}>
                <Image style={GlobalStyle.arrowBack} source={require('./img/login_back.png')}/>
            </TouchableOpacity>
              <View style={styles.header}>
                  <Text style={[GlobalStyle.whiteFont, styles.headline]}>Forgot Password</Text>
              </View>
              <View style={styles.inputs}>
                <View style={styles.instructions}>
                  <Text style={GlobalStyle.whiteFont}>Please type in your Email!</Text>
                </View>
                <View style={GlobalStyle.inputContainer}>
                    <Image style={GlobalStyle.inputEmail} source={require('./img/login_email.png')}/>
                    <LoginTextInput
                      placeholder='Email'
                      value={this.state.email}
                      onChangeText={(email) => this.setState({email})}
                    />
                </View>
              </View>
              <LoginButton
                onPress={() => this._handleResetPassword()}
                text='Reset Password'
              />
              <View style={GlobalStyle.bottomArea}>
                  <Text style={GlobalStyle.greyFont}>Don't have an account?
                    <Text style={GlobalStyle.whiteFont}
                      onPress={() => this._handleSignUp()}>  Sign Up
                    </Text>
                  </Text>
              </View>
          </View>
        </View>
    );
  }
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
  }
  _handleSignUp(event){
    console.log('Sign Up pressed');
    this.props.navigator.replace({
      id: 'SignUp'
    });
  }

}

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
});


export default ForgotPassword;
