import React from 'react';
import { StyleSheet, TextInput, View, Image, Keyboard, AsyncStorage, Alert, ImageBackground, Text, TouchableOpacity } from 'react-native';

export default class RegisterScreen extends React.Component {
  // Fetch of Ajax via php
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Register',
  };

  registerPress = () =>{
    const {email, username, password} = this.state;
    // alert(username);
    Keyboard.dismiss();
    fetch('https://360feedback-app.mitchellbreden.nl/register.php', {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: 'email='+email+'&username='+username+'&password='+password
    })
      .then((res) => res.json())
      .then((data) => {
        if(data === 'Ok') {
          _storeData = async () => {
            try {
              await AsyncStorage.setItem('user', username);
              await AsyncStorage.setItem('pass', password);
            } catch (error) {
              // Error saving data
            }
          };
          _storeData();

          this.props.navigation.navigate('Main');
        } 
        else if(data === 'Exist') {
          Alert.alert('Helaas bestaat deze gebruiker al :/');
        }
        else {
          Alert.alert('Ooops iets gaat er fout :/');
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/deltion_background.png')} style={{width: '100%', height: '100%', justifyContent: 'center'}}>
          <View style={{marginBottom: 100, alignItems: 'center'}}>
            <Image source={require('../assets/images/deltion_logo.png')} style={{width: 200, height: 100}}/>
            <TextInput
              style={{width: '70%', backgroundColor:'white', padding: 10, borderRadius: 8, marginVertical: 12, fontSize: 16}}
              placeholder='Email' onChangeText={email => this.setState({email})}
            />

            <TextInput
              style={{width: '70%', backgroundColor:'white', padding: 10, borderRadius: 8, marginVertical: 12, fontSize: 16}}
              placeholder='Username' onChangeText={username => this.setState({username})}
            />

            <TextInput
              style={{width: '70%', backgroundColor:'white', padding: 10, borderRadius: 8, marginVertical: 12, fontSize: 16}}
              placeholder='Password' onChangeText={password => this.setState({password})}
              secureTextEntry={true}
            />
            
            <TouchableOpacity style={{ backgroundColor: '#FE6F20', width: '70%', marginTop: 18 }} onPress={this.registerPress}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 15}}>Register</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
