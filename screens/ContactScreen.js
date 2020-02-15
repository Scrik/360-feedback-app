import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    Keyboard,
    AsyncStorage,
    Alert,
    ImageBackground,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import Constants from 'expo-constants';

export default class ContactScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            note: ''
        }
    }

    mailPress = () => {
        const {name, email, note} = this.state;
        // alert(username);
        Keyboard.dismiss();
        fetch('https://360feedback-app.mitchellbreden.nl/mail.php', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: 'name=' + name + '&email=' + email + '&note=' + note
        })
            .then((res) => res.json())
            .then((data) => {
                if (data === 'Ok') {
                    Alert.alert('Bericht is verstuurd');
                } else {
                    Alert.alert('Bericht kan niet verstuurd worden');
                }
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginBottom: 100, alignItems: 'center'}}>
                    <Text style={styles.Title}>Contact</Text>
                    <TextInput style={styles.textInput}
                               placeholder='Naam'
                               onChangeText={name => this.setState({name})}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        onChangeText={email => this.setState({email})}
                    />

                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.textField}
                        includeFontPadding={false}
                        placeholder='Bericht'
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                        onChangeText={note => this.setState({note})}
                    />

                    <TouchableOpacity
                        style={{backgroundColor: '#292D6C', width: '70%', marginTop: 18, borderRadius: 25}}
                        onPress={this.mailPress}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20,
                            textAlign: 'center',
                            padding: 15
                        }}>Verstuur</Text>
                    </TouchableOpacity>
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
    textInput: {
        width: '85%',
        height: '10%',
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: '#aba8a5',
        padding: 7,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        marginVertical: 12,
        fontSize: 16,
        borderLeftColor: '#E80000',
        borderLeftWidth: 25,
        elevation: 5,
        ...Platform.select({
            android: {
                paddingLeft: 30
            },
        })
    },
    textField: {
        width: '85%',
        height: '30%',
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: '#aba8a5',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        padding: 7,
        shadowRadius: 3,
        marginVertical: 12,
        fontSize: 16,
        borderLeftColor: '#E80000',
        borderLeftWidth: 25,
        elevation: 5,
        ...Platform.select({
            android: {
                paddingLeft: 30
            },
        })
    },
    Title: {
        fontSize: 20,
        color: "#000000",
        fontWeight: 'bold',
        padding: 10,
        marginRight: 220,
        borderRadius: 15
    },

});
