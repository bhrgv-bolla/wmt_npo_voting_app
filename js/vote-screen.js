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
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Radio } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

//Voting screen needs to have Atleast 3 top NPO's. And a way to get more NPO.
export default class VotingScreen extends Component {


  _getTop3NPOsForStore = () => {
      console.log("Mehotd: Top3Npos", this.props.storeId);
      return [{
        "name":"Habitat For Humanity"
      },{
        "name":"Feeding America"
      },{
        "name":"UNICEF"
      }];
  }


  _getAllNPOsForStore = () => {
    console.log("Mehotd: AllNPOsForStore", this.props.storeId);
    return [{
      "name":"Habitat For Humanity"
    },{
      "name":"Feeding America"
    },{
      "name":"UNICEF"
    },{
      "name":"Amnesty International"
    }];
  }


  _handleTransitionToManyNPOsView = () => {
    console.log("~~~~~ALright! Handle transition to more NPOs view", this.props.storeId);
    this.props.navigator.push({
      name: 'MoreVotingScreen',
      passProps: {
        storeId: this.props.storeId,
      },
    })
  }

  _renderTop3NPOs = () => {
      console.log("Method: Render Top 3 NPOs");
      let x = this._getTop3NPOsForStore();
      const npos = x.map((npo) => <Button block primary key={npo.name.toString()} style={styles.customButton}><Text>{npo.name}</Text></Button>);
      return npos;
  }

  _sendVote = () => {
    console.log("In send vote", this.state.selected);
    //TODO send the vote to Javier's voting Service

    this._handleTransitionToSuccessVotePage();
  }

  

  render(){
    console.log(this.props, "From Voting Screen");
    const npos = this._renderTop3NPOs();
    console.log("Top 3 npos", npos);
    // return (
    //   <View>
    //     <View><Text>3 Buttons go here ( Top Three ). Need to call the end points for store configs</Text></View>
    //     <View><Text> More NPO; {this.props.storeId} </Text></View>
    //   </View>
    // )
    // {npos.map((npo) => <Row key={npo.key.toString()} size={1} style={{width: Dimensions.get('window').width}}>{npo}</Row>)}

    //New return
    //May be add more icons later.
    return (
      <Container>
        <Header>
          <Body>
            <Title>
              Vote For Non-Profit!
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='ios-help'/>
            </Button>
          </Right>
        </Header>

        <Content style={styles.centerContent}>
          <Grid>
            <Row size={1} style={{alignItems:"center", height:100}}>
            <View style={{justifyContent:"center"}}>
              <Text style={{textAlign:"center"}}>
                Click on a non profit to vote for it. {'\n'}
                Click on help to learn more about the program.
              </Text>
            </View>
            </Row>
            <Col>
            {npos}
            </Col>
          </Grid>
        </Content>

        <Footer>
            <FooterTab>
              <Button full success onPress={this._handleTransitionToManyNPOsView}>
                <Text>More</Text>
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
    marginTop:20,
  },
  customButton: {
    padding: 20,
    margin: 20,
  }
}
