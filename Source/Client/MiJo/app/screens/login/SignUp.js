'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle.js'
import LoginButton from 'MiJo/app/components/buttons/LoginButton'
import LoginTextInput from 'MiJo/app/components/textInputs/LoginTextInput'

// global vars
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} = React;

class SignUp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
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
                  <Text style={[GlobalStyle.whiteFont, styles.headline]}>Sign Up</Text>
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
                      <Image style={GlobalStyle.inputEmail} source={require('./img/login_email.png')}/>
                        <LoginTextInput
                          placeholder='Email'
                          value={this.state.email}
                          onChangeText={(email) => this.setState({email})}
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
              </View>
              <LoginButton onPress={() => this._handleSignUp()} text="Sign up"/>

              <View style={GlobalStyle.bottomArea}>
                  <Text style={GlobalStyle.greyFont}>Already have an account?
                    <Text style={GlobalStyle.whiteFont}
                      onPress={() => this._handleSignIn()}>  Sign In
                    </Text>
                  </Text>
              </View>
          </View>
        </View>
    );
  }
  _handleSignIn(event){
    console.log('Sign In pressed');
    this.props.navigator.push({
      id: 'SignIn'
    });
  }
  _handleSignUp(event){
    console.log('Sign Up pressed');
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
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .5
    },
});


export default SignUp;
