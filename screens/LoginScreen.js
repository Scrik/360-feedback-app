import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Image, Keyboard, AsyncStorage, Alert, ImageBackground, Text, TouchableOpacity } from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    getUserStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('user');

        if (value !== null) {
          this.props.navigation.navigate('Main');
        }
      }
      catch (error) {
        Alert.alert(error);
      }
    };

    getUserStatus();

    this.state = {
      username: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Login',
    header:null
  };

  loginPress = () =>{
    const {username, password} = this.state;
    Keyboard.dismiss();
    fetch('https://360feedback.tech/app/login.php', {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: 'username='+username+'&password='+password
    })
      .then((res) => res.json())
      .then((data) => {
        if(data == 'Ok') {
          _storeData = async () => {
            try {
              await AsyncStorage.setItem('user', username);
              await AsyncStorage.setItem('pass', password);
            } catch (error) {
              // Error saving data
            }
          }
          _storeData();

          this.props.navigation.navigate('Main');
        }
        else {
          Alert.alert('User not found!');
        }
      });
  };

  render() {
    return (
    <ImageBackground source={require('../assets/images/deltion_background.png')} style={{flex: 1, resizeMode: 'cover'}}>
          <View style={styles.center}>
            <Image source={require('../assets/images/deltion_logo.png')} style={{width: 200, height: 100}}/>
            <TextInput
              style={{width: '70%', backgroundColor:'white', padding: 10, borderRadius: 8, marginVertical: 12, fontSize: 16}}
              placeholder='Username' onChangeText={username => this.setState({username})}
            />

            <TextInput
              style={{width: '70%', backgroundColor:'white', padding: 10, borderRadius: 8, marginVertical: 12, fontSize: 16}}
              placeholder='Password' onChangeText={password => this.setState({password})}
              secureTextEntry={true}
            />

            <TouchableOpacity style={{ backgroundColor: '#FE6F20', width: '70%', marginTop: 18 }} onPress={this.loginPress}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 15}}>Login</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.bottom}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'white', fontSize: 18}}>Don't have account? </Text>
              <Text onPress={() => this.props.navigation.navigate('Register')} style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Sign Up</Text>
            </View>
          </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom:65,
    alignItems: 'center'
  }
});
