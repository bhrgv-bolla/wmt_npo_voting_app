import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import {
  StyleSheet,
  NavigatorIOS,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from 'react-native';

//Voting screen needs to have Atleast 3 top NPO's. And a way to get more NPO.
export default class VotingScreen extends Component {


  render(){
    console.log(this.props, "From Voting Screen");
    return (
      <View>
        <View>3 Buttons go here ( Top Three ). Need to call the end points for store configs</View>
        <View> More NPO </View>
      </View>
    )
  }

}
