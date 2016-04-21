'use strict';

// imports
import React, { Component, PropTypes } from 'react-native'
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

const NavBarNavigationDrawer = ({
  title,
  onPress
}) => {
  return (
      <NavBar>
        <NavButton onPress={onPress}>
          <NavButtonText>
            {"Open Drawer"}
          </NavButtonText>
        </NavButton>
        <NavTitle>
          {title}
        </NavTitle>
        <NavButton onPress={() => alert('adding item')}>
          <NavButtonText>
            {""}
          </NavButtonText>
        </NavButton>
      </NavBar>
    )
};

NavBarNavigationDrawer.PropTypes = {
  title: PropTypes.string,
  onPress: PropTypes.function,
}
  

export default NavBarNavigationDrawer;