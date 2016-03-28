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
                  <Text style={[globalStyle.whiteFont, styles.headline]}>Sign Up</Text>
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
                      />
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
              </View>
              <TouchableElement
                onPress={() => this._handleSignUp()}>
                <View style={globalStyle.submit}>
                    <Text style={globalStyle.whiteFont}>Sign Up</Text>
                </View>
              </TouchableElement>

              <View style={globalStyle.bottomArea}>
                  <Text style={globalStyle.greyFont}>Already have an account?
                    <Text style={globalStyle.whiteFont}
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


module.exports = SignUp;
