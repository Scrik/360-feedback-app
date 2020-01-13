import React from 'react';

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
// import { StackActions, NavigationActions } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ContactScreen from '../screens/ContactScreen';

import navScreen from './BottomTabNavigator';

const HomeNavigator  = createStackNavigator({
    Login: {
        screen:LoginScreen,
    },
    Register: {
        screen:RegisterScreen
    },
    Contact: {
        screen:ContactScreen
    },
    Main: {
        screen:navScreen,
        navigationOption: {
            gesturesEnabled: false,
        }
    }
  },
  {
    initialRouteName: "Login",
    headerMode:'none',
  }
);

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: 'Profile' })],
// });

// this.props.navigation.dispatch(resetAction);


export default createAppContainer(HomeNavigator);