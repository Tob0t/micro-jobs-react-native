'use strict';

// imports
import React, { Component, PropTypes } from 'react-native'
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

const NavBarStandard = ({
  title,
  onPress
}) => {
  return (
      <NavBar>
        <NavButton onPress={onPress}>
          <NavButtonText>
            {"Back"}
          </NavButtonText>
        </NavButton>
        <NavTitle>
          {title}
        </NavTitle>
        <NavButton onPress={() => alert('adding item')}>
          <NavButtonText>
            {"+"}
          </NavButtonText>
        </NavButton>
      </NavBar>
    )
};

NavBarStandard.PropTypes = {
  title: PropTypes.string,
  onPress: PropTypes.function,
}
  

export default NavBarStandard;