import React, { Component } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, Keyboard, AsyncStorage, Button, FlatList, Text, ActivityIndicator, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Constants from "expo-constants";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    filledQuestions = async (questions) => {
        const username = await AsyncStorage.getItem('user');
        const password = await AsyncStorage.getItem('pass');
        
        fetch('https://360feedback.tech/app/favorite_get.php?action=getall', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: 'username='+username+'&password='+password+'&rating=1'
            })
            .then((res) => res.json())
            .then((data) => {
                data.forEach(element => {
                    index = questions.findIndex(x => x.id === element['id']);
                    questions.splice(index, 1);
                });

                this.setState({
                    isLoading: false,
                    dataSource: questions,
                });
            }
        );
    };

    getQuestions = () => {
        fetch('https://360feedback.tech/questions-json')
        .then((response) => response.json())
        .then((responseJson) => {
            // this.setState({
            //     isLoading: false,
            //     dataSource: responseJson,
            // });

            this.filledQuestions(responseJson)
        })
        .catch((error) =>{
            console.error(error);
        }); 
    }; 

    componentDidMount(){
        this.getQuestions();
    }


    static navigationOptions = {
        header: null
    };

    likePress = async (info) =>{
        const username = await AsyncStorage.getItem('user');
        const password = await AsyncStorage.getItem('pass');

        fetch('https://360feedback.tech/app/favorite.php?action=add', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: 'username='+username+'&password='+password+'&question='+info+'&rating=1'
        })
          .then((res) => res.json())
          .then((data) => {
            if(data == 'Ok') {
                
            }
            else {
              Alert.alert('Oops er ging iets mis.');
            }
          });

        this.getQuestions(); 
    }

    dislikePress = async (info) =>{
        const username = await AsyncStorage.getItem('user');
        const password = await AsyncStorage.getItem('pass');

        fetch('https://360feedback.tech/app/favorite.php?action=add', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: 'username='+username+'&password='+password+'&question='+info+'&rating=0'
        })
            .then((res) => res.json())
            .then((data) => {
            if(data == 'Ok') {
                // this.forceUpdate();
                this.props.navigation.navigate('Main');
            }
            else {
                Alert.alert('Oops er ging iets mis.');
            }
            });

        this.getQuestions(); 
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={[styles.containerActivityIndicator, styles.horizontal]}>
                    <ActivityIndicator size="large" color="rgb(246, 127, 26)" />
                </View>
            )
        }

        return(
            <View style={styles.container}>

                <View style={styles.title}>
                    <Text style={styles.titleText}>Home</Text>
                </View>

                <Carousel
                    layout={'default'}
                    sliderWidth={viewportWidth}
                    itemWidth={viewportWidth}
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.state.dataSource}
                    renderItem={({item}) =>

                    <View style={styles.container}>
                        <Text style={styles.banner}>
                            <Text style={styles.bannerText}>{item.category}</Text>
                        </Text>

                        <View style={styles.home}>
                            <Text style={styles.bannerText}>{item.question}</Text>
                        </View>

                        <View style={styles.bottom}>
                            <View style={styles.horizontal}>
                                <TouchableOpacity style={styles.like} onPress={() => this.likePress(item.id)}>
                                    <Text>
                                        <Icon name="thumbs-up" size={25} color="#ffffff" />
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dislike} onPress={() => this.dislikePress(item.id)}>
                                    <Text>
                                        <Icon name="thumbs-down" size={25} color="#ffffff" />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    }
                />
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
    banner: {
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#292D6C",
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
    },
    bannerText: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: 'bold'
    },
    home: {
        padding: 40,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: "#FE6F20",
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    homeText: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: 'bold'
    },
    containerActivityIndicator: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    like: {
        width: 70,
        alignContent: 'center',
        backgroundColor: "#008000",
        padding: 20,
        borderRadius: 200,
        justifyContent: 'center',
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    dislike: {
        width: 70,
        alignContent: 'center',
        backgroundColor: "#FF0000",
        padding: 20,
        borderRadius: 200,
        justifyContent: 'center',
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    bottom: {
        flex: 1,
        marginTop: 25,
        marginBottom: 150,
    },
});
