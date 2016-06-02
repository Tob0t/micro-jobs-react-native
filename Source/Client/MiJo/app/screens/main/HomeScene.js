'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
import ControlPanel from './ControlPanel'
import CardScene from './CardScene'
import Api from 'MiJo/app/Api'
import Drawer from 'react-native-drawer'
import NavBarNavigationDrawer from 'MiJo/app/components/navbar/NavBarNavigationDrawer'


// global vars
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

class HomeScene extends React.Component {
  constructor(props) {
    super(props);
  }

  closeDrawer = () => {
    this._drawer.close();
  };
  openDrawer = () => {
    this._drawer.open();
  };

  render() {
    return (
      <Drawer
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={<ControlPanel navigator={this.props.navigator}/>}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={{
          //drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
          main: {paddingLeft: 3}
        }}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
        <NavBarNavigationDrawer title="MiJo" onPress={this.openDrawer}/>
        <CardScene/>
      </Drawer>
    );


  }
}

var styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'column',
    flex: 0.05,
    marginTop: 5
  },
})

export default HomeScene;
