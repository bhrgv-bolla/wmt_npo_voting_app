'use strict';

import React, {
    Component,
    PropTypes
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    Navigator,
    Vibration,
    Linking,
    Button,
    Animated,
    Easing,
    View
} from 'react-native';




export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      console.log("Main componentDidMount");
    }

    gotoStore = () => {
      console.log("Routed to store", this, this.props);
    }


      onSuccess(e) {
        console.log("Main QRScanner Data is:"+e.data);
        // Linking.openURL(e.data).catch(err => console.error('An error occured', err))
      }

    gotoVoting= () => {
      console.log("Routed to Voting app", this.props);
      this.props.navigator.push({
        name: 'QRCodeScanner',
        passProps: {
          onRead: this.onSuccess.bind(this),
          reactivate: true,
          topContent: <Text style={styles.centerText}>Scan your <Text style={styles.textBold}>Walmart Receipt</Text> to cast your vote.</Text>
        },
      })
    }

    render() {
        return ( <
            View style = {
                {
                    flex: 1,
                    marginTop: 64,
                }
            } >
            <
            Button onPress = {
                this.gotoStore
            }
            style={{color: 'blue'}}
            title = "Store Configurations"
            color = "#841584"
            accessibilityLabel = "Align Stores to NPO's" /
            >

            <
            Button onPress = {
                this.gotoVoting
            }
            style={{color: 'blue'}}
            title = "Voting App"
            color = "#841584"
            accessibilityLabel = "Voting app" /
            >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    infoView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },

    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
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
        // backgroundColor: 'pink',
        padding: 16,
    },

    camera: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: 'hsl(0, 0%, 45%)',
        backgroundColor: 'transparent',
    },
})
