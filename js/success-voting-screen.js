import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

import {
  StyleSheet,
  NavigatorIOS,
  Navigator,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  InteractionManager
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, List, ListItem, Item, Input, Text, Radio, Spinner } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

import { Pie } from 'react-native-pathjs-charts';


//Voting screen needs to have Atleast 3 top NPO's. And a way to get more NPO.
//Works on this.state.selected..
export default class SuccessVotingScreen extends Component {

  //Slect nothing initially
  constructor(props){
    super(props);
    this.state = {selected:null, voteButtonDisabled:true, renderPlaceholderOnly: true};
  }

  //(TODO  {@pattricks analytics service} Will make a call to  )
  _getAllNPOsStatsForStore = () => {
    console.log("Mehotd: AllNPOsForStore", this.props.storeId);
    return [{
      "name":"Habitat For Humanity",
      percentage: 22,
    },{
      "name":"Feeding America",
      percentage: 33,
    },{
      "name":"UNICEF",
      percentage: 15,
    },{
      "name":"OTHER",
      percentage: 6,
    }];
  }

  componentDidMount() {
    console.log("votingscreenmany componentDidMount");
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  //Return back to the home page again.
  _transitionToHomeAgain = () => {
    this.props.navigator.push({
      name: 'Main'
    })
  }


  render(){
    if (this.state.renderPlaceholderOnly) {
    return (<Container>

        <Header>
            <Body>
              <Title>
                Vote Distributions
              </Title>
            </Body>
        </Header>
              <Content>
                  <Spinner color='green' />
              </Content>
          </Container>);
    }

    console.log(this.props, "From SuccessVotingScreen");
    const npos = this._getAllNPOsStatsForStore();
    console.log("All npos", npos);
    let options = {
      margin: {
        top: 10,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
      color: '#30b929',
      r: 0,
      R: 150,
      legendPosition: 'topRight',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: true,
        color: '#ECF0F1'
      }
    };

    return (
      <Container>
        <Header>
            <Body>
              <Title>
                Vote Distributions
              </Title>
            </Body>
        </Header>

        <Content style={styles.centerContent}>
            <Pie
            data={npos}
            options={options}
            accessorKey="percentage"
            pallete={
            [
              {'r':25,'g':99,'b':201},
              {'r':24,'g':175,'b':35},
              {'r':190,'g':31,'b':69},
              {'r':100,'g':36,'b':199},
              {'r':214,'g':207,'b':32},
              {'r':198,'g':84,'b':45}
            ]
          } />
        </Content>

        <Footer>
            <FooterTab>
              <Button full success onPress={this._transitionToHomeAgain}>
                <Text>Thanks, See you again!</Text>
              </Button>
            </FooterTab>
        </Footer>
      </Container>

    )
  }
}

const styles = {
  centerContent: {
    flex: 1,
    flexDirection: 'column',
    marginTop:100,
  },
  customButton: {
    padding: 20,
    margin: 20,
  }
}
