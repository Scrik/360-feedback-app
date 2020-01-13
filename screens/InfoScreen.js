import React, { Component } from 'react';
import {StyleSheet, View, AsyncStorage, Button, FlatList,Text, TextInput, Platform} from 'react-native';
import Constants from 'expo-constants';

export default class HighScoresScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    logoutPress = async () =>{
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('pass');
            this.props.navigation.navigate('Login');
        }
        catch (error) {
            // Error
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Waarom deze app?</Text>
                </View>

                <View style={styles.textblock}>
                    <Text style={styles.textField}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere dictum ante ut sagittis. In mi arcu, dignissim vel aliquam facilisis, elementum id erat. Sed volutpat, ipsum id efficitur fringilla, diam quam lobortis metus, vel euismod lorem augue non libero. Duis at elit semper, vulputate nisi eget, porta eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur est urna, venenatis vitae eros nec, mattis gravida mi. Donec pretium feugiat eros at dignissim. Fusce et placerat neque. Integer pellentesque, libero eget pharetra rutrum, tellus nulla fermentum nisl, nec fringilla nulla nisl vel nisi. Donec at venenatis quam. Duis vestibulum tempor euismod. Cras vestibulum tincidunt quam id venenatis. Vestibulum non ipsum nisi.</Text>
                </View>

                <View style={styles.logout}>
                    <Button title='Logout' color={'#FE6F20'} onPress={this.logoutPress}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginBottom: 100
    },
    title: {
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
    },
    titleText: {
        fontSize: 20,
        color: "#000000",
        fontWeight: 'bold'
    },
    textField:{
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "white",
        borderRadius: 25,
        //shadow
        shadowColor: '#aba8a5',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        padding: 7,
        shadowRadius: 3,
        fontSize: 14,
        elevation: 5,
        ...Platform.select({
            android: {
                paddingLeft: 30
            },
        })
    },
    Title:{
        fontSize: 20,
        color: "#000000",
        fontWeight: 'bold',
        padding: 10,
        marginRight: 220,
        borderRadius: 15
    },
    logout:{
        marginTop: 50,
        marginLeft: 100,
        marginRight: 100
    }
});
