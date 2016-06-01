'use strict';

// imports
import React, { Component, Platform, PropTypes, StyleSheet } from 'react-native'
import NavBar, { NavButton, NavButtonText, NavTitle, NavGroup } from 'react-native-nav'
import Icon from 'react-native-vector-icons/Ionicons'

const NavBarStandard = ({
  title,
  onPressLeft,
  onPressRight
}) => {
  return (
     <NavBar style={styles}>
        <NavGroup style={styles.navGroup}>
          <NavButton onPress={onPressLeft}>
            <NavButtonText>
              <Icon name="ion-ios-arrow-back" size={25}/>
            </NavButtonText>
          </NavButton>
        </NavGroup>
        <NavTitle>
          {title}
        </NavTitle>
        <NavGroup>
        </NavGroup>
      </NavBar>
    )
};

NavBarStandard.PropTypes = {
  title: PropTypes.string,
  onPressLeft: PropTypes.function,
  onPressRight: PropTypes.function,
}

var styles = StyleSheet.create({
  navBar: {
    // NavBar styles here (all view styles are valid)

    // default shared styles:
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // custom
    paddingLeft: (Platform.OS === 'android') ? 0 : 10

  },
  navGroup: {
     justifyContent: 'flex-start',
  }
})


export default NavBarStandard;
