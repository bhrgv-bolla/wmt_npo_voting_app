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
    Animated,
    Easing,
    View,
    InteractionManager
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Spinner } from 'native-base';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {renderPlaceholderOnly: true};
    }

    componentDidMount() {
      console.log("Main componentDidMount");
      InteractionManager.runAfterInteractions(() => {
        this.setState({renderPlaceholderOnly: false});
      });
    }

    gotoStore = () => {
      console.log("Routed to store", this, this.props);
    }

    handleTransitionToVotingScreen = (storeId) => {
      console.log("#####In handle Transistion");
      this.props.navigator.push({
        name: 'VotingScreen',
        passProps: {
          storeId: storeId
        },
      })
    }

      onSuccess(e) {
        console.log("Main QRScanner Data is:"+e.data);
        //COnvert to some fake store later.
        this.handleTransitionToVotingScreen(e.data);
        // Linking.openURL(e.data).catch(err => console.error('An error occured', err))
      }


    /*

    reactivate: true,
    reactivateTimeout: 5000,
    */

//Change this to have QR before going to voting.
    gotoVoting= () => {
      console.log("Routed to Voting app", this.props);
      // this.props.navigator.push({
      //   name: 'QRCodeScanner',
      //   passProps: {
      //     onRead: this.onSuccess.bind(this),
      //     topContent: <Text style={styles.centerText}>Scan your <Text style={styles.textBold}>Walmart Receipt</Text> to cast your vote.</Text>
      //   },
      // })

      this.handleTransitionToVotingScreen("Store100");

    }

    render() {
      if (this.state.renderPlaceholderOnly) {
      return (<Container>
                <Content>
                    <Spinner color='green' />
                </Content>
            </Container>);
    }
        return (
          <Container>
            <Header>
              <Body>
                <Title>Start Demo</Title>
              </Body>
            </Header>
            <Content>
              <Button block onPress = {this.gotoStore} style={styles.customButton}>
                <Text>Store Configurations</Text>
              </Button>
              <Button block success onPress={this.gotoVoting} style={styles.customButton}>
                <Text>Voting App</Text>
              </Button>
            </Content>
          </Container>
        )
    }
}



//Styles below ( Clean up later Not using all of these!!!!!!)
const styles = {
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

    customButton: {
      padding: 20,
      margin: 20,
    }
}
