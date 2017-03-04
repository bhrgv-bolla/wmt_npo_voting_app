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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, List, ListItem, Item, Input, Text, Radio } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';


//Voting screen needs to have Atleast 3 top NPO's. And a way to get more NPO.
//Works on this.state.selected..
export default class SuccessVotingScreen extends Component {

  //Slect nothing initially
  constructor(props){
    super(props);
    this.state = {selected:null, voteButtonDisabled:true};
  }

  //Get all stats for NPOs for a store. (TODO  Will make a call to pattricks analytics service )
  _getAllNPOsStatsForStore = () => {
    console.log("Mehotd: AllNPOsForStore", this.props.storeId);
    return [{
      "name":"Habitat For Humanity"
    },{
      "name":"Feeding America"
    },{
      "name":"UNICEF"
    }];
  }


  render(){
    console.log(this.props, "From SuccessVotingScreen");
    const npos = this._getAllNPOsStatsForStore();//TODO draw a Pie chart out of this information.
    console.log("All npos", npos);

    return (
      <Container>
        <Header searchBar rounded>
            <Item>
                <Icon name="search" />
                <Input placeholder="Search Non-Profit" />
                <Icon active name="md-notifications-outline" />
            </Item>
            <Button transparent>
                <Text>Search</Text>
            </Button>
        </Header>

        <Content style={styles.centerContent}>
          <List dataArray={npos} renderRow={(npo) => {

                        if(npo.toString().search(this.state.search) == -1 && this.state.search) return;
                        return (<ListItem selected={npo.name == this.state.selected?true:false} onPress={() => this._handleListSelect(npo)}>
                            <Text>{npo.name}</Text>
                            <Right>
                              <Radio selected={npo.name == this.state.selected?true:false}/>
                            </Right>
                        </ListItem>)
                        }
                    } />
        </Content>

        <Footer>
            <FooterTab>
              <Button full success onPress={this._sendVote} disabled={this.state.voteButtonDisabled}>
                <Text>Vote</Text>
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
