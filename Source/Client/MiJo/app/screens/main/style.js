'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  StyleSheet,
  Platform,
} = React;

var Style = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
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
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    arrowBack: {
        marginLeft: 10,
        width: 20,
        height: 20,
    },
    inputEmail: {
        marginLeft: 15,
        width: 22,
        height: 19
    },
    inputPassword: {
        marginLeft: 15,
        width: (Platform.OS === 'android') ? 21 : 20,
        height: (Platform.OS === 'android') ? 23 : 21,
    },
    inputUsername: {
      marginLeft: 15,
      width: (Platform.OS === 'android') ? 21 : 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: (Platform.OS === 'android') ? 6 : 12,
        right: 0,
        height: (Platform.OS === 'android') ? 35 : 20,
        fontSize: 14,
    },
    submit: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    bottomArea: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})


module.exports = Style;
