import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import QRCodeScanner from './js/react-native-qrcode-scanner';


import {
  StyleSheet,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from 'react-native';

TODO remove later
// import cameraApp from './js/CameraApp.js';

// This would be the root class for the app.
/*
* This app would be of three screens. (
*  1. Reading a receipt
*  2. Store => Foundation organizations. ( More information / more store's; Just a single click. => Confirm necessary (?) )
*  3. Show how there vote effects the results of that store. (% distribution of store's information)
*/
export default class VotingApp extends Component {
  onSuccess(e) {
    console.log("Data is:"+e.data);
    // Linking.openURL(e.data).catch(err => console.error('An error occured', err))
  }

  render() {
    console.log("Right on!!!");
    return (
      <NavigatorIOS
        initialRoute={{
          component: QRCodeScanner,
          title: 'Add Receipt',
          barTintColor: '#007bc4',
          passProps: {
            onRead: this.onSuccess.bind(this),
            reactivate: true,
            topContent: <Text style={styles.centerText}>Scan your <Text style={styles.textBold}>Walmart Receipt</Text> to cast your vote.</Text>
          }
        }}
        style={{flex: 1}}
      />
    )
  }
}


/*
,
topContent: <Text style={styles.centerText}>Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.</Text>,
bottomContent: <TouchableOpacity style={styles.buttonTouchable}><Text style={styles.buttonText}>OK. Got it!</Text></TouchableOpacity>
*/


const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: 3,
    padding: 32,
    width: 100,
    marginTop: 64,
    marginBottom: 64,
  },

  centerText: {
    fontSize: 13,
    padding: 30,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
});



AppRegistry.registerComponent('VotingApp', () => VotingApp);
