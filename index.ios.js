

import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import QRCodeScanner from './js/react-native-qrcode-scanner';

//Custom imports
import Main from './js/main.js';

import VotingScreen from './js/vote-screen.js';
import VotingScreenMany from './js/voting-screen-many.js';
import SuccessVotingScreen from './js/success-voting-screen.js';


import StoreConfigurationsScreen from './js/store-configurations-screen.js';
import NPODetailScreen from './js/NPO-detail-screen.js';
import AddNPOScreen from './js/Add-NPO-screen.js';


import {
  StyleSheet,
  NavigatorIOS,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from 'react-native';

// import cameraApp from './js/CameraApp.js';

// This would be the root class for the app.
/*
( Store Service => Crud Operations Manage; Voting App. )
* This app would be of three screens. (
*  1. Reading a receipt
*  2. Store => Foundation organizations. ( More information / more store's; Just a single click. => Confirm necessary (?) )
*  3. Show how there vote effects the results of that store. (% distribution of store's information)

This is primarily for the anatomy of the page.
*/
export default class VotingApp extends Component {
  onSuccess(e) {
    console.log("Data is:"+e.data);
    // Linking.openURL(e.data).catch(err => console.error('An error occured', err))
  }

  //Render scene pass in navigator to the component as a prop.
  renderScene(route, navigator) {
   if(route.name == 'Main') {
     console.log("~~~~Alright! rendering scene~~~~");
     return <Main navigator={navigator} />
   }
   else if(route.name == 'QRCodeScanner') {
     console.log("~~~~Alright! rendering QRCodeScanner scene~~~~");
     return <QRCodeScanner navigator={navigator} {...route.passProps} />
   }
   else if(route.name == 'VotingScreen') {
     console.log("~~~~Rendering VotingScreen scene");
     return <VotingScreen navigator={navigator} {...route.passProps} />
   }
   else if(route.name == 'MoreVotingScreen'){
     console.log("~~~~Rendering MoreVotingScreen scene");
     return <VotingScreenMany navigator={navigator} {...route.passProps} />
   }
   else if(route.name == 'SuccessVotingScreen'){
     console.log("~~~~Rendering Success Voting Screen ")
     return <SuccessVotingScreen navigator={navigator} {...route.passProps}/>
   }
   else if(route.name == 'StoreConfigurationsScreen'){//Not expecting any passProps at the moment.
     console.log("~~~~Rendering StoreConfigurationsScreen ");
     return <StoreConfigurationsScreen navigator={navigator} {...route.passProps}/>
   }
   else if(route.name == 'NPODetailScreen'){
     console.log("~~~~Rendering NPODetailScreen");
     return <NPODetailScreen navigator={navigator} {...route.passProps}/>
   }
   else if(route.name == 'AddNPOScreen'){
     console.log("~~~~Rendering AddNPOScreen");
     return <AddNPOScreen navigator={navigator} {...route.passProps}/>
   }
 }

  render() {
    console.log("Right on!!!");
    return (
      <Navigator
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        style={{ flex:1 }}
        initialRoute={{ name: 'Main' }}
        renderScene={ this.renderScene } />
    )
  }
}


/*
,
topContent: <Text style={styles.centerText}>Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.</Text>,
bottomContent: <TouchableOpacity style={styles.buttonTouchable}><Text style={styles.buttonText}>OK. Got it!</Text></TouchableOpacity>
*/

/*

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
