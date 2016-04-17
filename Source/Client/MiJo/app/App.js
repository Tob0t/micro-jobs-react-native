'use strict';

// imports
import React from 'react-native'
import Router from './Router'

// global vars
const {
  Navigator
} = React;



class App extends React.Component{
  render() {
    console.log("app");
    return (
      <Navigator
        initialRoute={{id:'SignIn'}}
        renderScene={(route,navigator) =>
          <Router id={route.id} navigator={navigator}/>
        }
      />
      );
  }
}

export default App;
