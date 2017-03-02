import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

// This would be the root class for the app.
/*
* This app would be of three screens. (
*  1. Reading a receipt
*  2. Store => Foundation organizations. ( More information / more store's; Just a single click. => Confirm necessary (?) )
*  3. Show how there vote effects the results of that store. (% distribution of store's information)
*/
export default class VotingApp extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

AppRegistry.registerComponent('VotingApp', () => VotingApp);
