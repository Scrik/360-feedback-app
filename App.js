import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import HomeNavigator  from './navigation/AppNavigator';

export default class App extends Component {  
  render() {
    // Disable Yellow Warnings
    console.disableYellowBox = true;

    return (
      <View style={styles.container}>
          <HomeNavigator  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
