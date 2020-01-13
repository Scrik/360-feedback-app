import React, { Component } from 'react';
import {StyleSheet, View, AsyncStorage, FlatList, Text, Platform, ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';

export default class HighScoresScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            dataSource: {},
            isLoading: true
        }
    }

    getUserInfo = async () => {
        const username = await AsyncStorage.getItem('user');
        const password = await AsyncStorage.getItem('pass');
        
        fetch('https://360feedback.tech/app/favorite_get.php?action=get', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: 'username='+username+'&password='+password+'&rating=1'
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    dataSource: data,
                    isLoading: false
                });
            }
        );
    };

    componentDidMount() {
        this.getUserInfo();

        //Here is the Trick
        const { navigation } = this.props;
        //Adding an event listner om focus
        //So whenever the screen will have focus it will set the state to zero
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getUserInfo();
            this.state ={
                isLoading: true
            };
        });
    }

    render() {

        if(this.state.isLoading){
            return(
                <View style={[styles.containerActivityIndicator, styles.horizontal]}>
                    <ActivityIndicator size="large" color="rgb(246, 127, 26)" />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Positief beoordeeld</Text>
                </View>

                <View>
                    <FlatList data={this.state.dataSource} renderItem={({item}) => <Text style={styles.textField}>{item.question}</Text> }/>
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
        backgroundColor:'white',
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
        marginVertical: 12,
        fontSize: 16,
        borderLeftColor: '#008000',
        borderLeftWidth: 25,
        elevation: 5,
        ...Platform.select({
            android: {
                paddingLeft: 30
            },
        })
    },
    //loadingIcon
    containerActivityIndicator: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
});
