import React, {Component} from 'react';
import {View, TouchableHighlight} from 'react-native';

import {createBottomTabNavigator} from "react-navigation-tabs";

import Icon from 'react-native-vector-icons/FontAwesome5';

import ContactScreen from '../screens/ContactScreen';
import InfoScreen from '../screens/InfoScreen';
import MainScreen from '../screens/MainScreen';
import LikeScreen from '../screens/LikeScreen';
import DislikeScreen from '../screens/DislikeScreen';

const SIZE = 70;

const AppNavigator = createBottomTabNavigator({
        Like: {
            screen:LikeScreen,
            navigationOptions:{
                tabBarIcon: ({tintColor}) =>
                    <Icon name="thumbs-up" size={25} color={tintColor} />
            },
        },
        Dislike: {
            screen:DislikeScreen,
            navigationOptions:{
                tabBarIcon: ({tintColor}) =>
                    <Icon name="thumbs-down" size={25} color={tintColor} />
            },
        },
        Main: {
            screen:MainScreen,
            navigationOptions:({navigation}) =>  ({
                tabBarIcon: <TouchableHighlight
                    onPress={() => navigation.navigate('Main')}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderRadius: SIZE / 2,
                        backgroundColor: '#f67f1a',
                        position: "absolute",
                        bottom: 15
                    }}
                >
                    <Icon name="home" size={35} color="#F8F8F8"/>
                </TouchableHighlight>
            }),
        },
        WhyThisApp: {
            screen:InfoScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) =>
                    <Icon name="question" size={25} color={tintColor} />
            },
        },
        Contact: {
            screen:ContactScreen,
            navigationOptions:{
                tabBarIcon: ({tintColor}) =>
                    <Icon name="comment-alt" size={25} color={tintColor} />
            },
        },
    },
    {
        initialRouteName: 'Main',
        tabBarOptions: {
            activeTintColor: '#f67f1a',
            inactiveTintColor: 'gray',
            showLabel: false,
            style:{
                borderStyle:'dotted',
                borderWidth: 0
            }
        }
    }
);

class navScreen extends React.Component {
    static router = AppNavigator.router;

    render() {
        return <AppNavigator navigation={this.props.navigation} />;
    }
}

export default navScreen;