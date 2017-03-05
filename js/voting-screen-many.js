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


//Voting screen needs to have Atleast 3 top NPO's. And a way to get more NPO.
//Works on this.state.selected..
export default class VotingScreenMany extends Component {

  //Slect nothing initially
  constructor(props){
    super(props);
    this.state = {selected:null, voteButtonDisabled:true, search:'', renderPlaceholderOnly: true};
  }

  //Right swipe more information.
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
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    },{
      "name":"Amnesty International"
    }];
  }



//select something and send vote
  _sendVote = () => {
    console.log("In send vote", this.state.selected);
    //TODO send the vote to Javier's voting Service

    this._handleTransitionToSuccessVotePage();
  }

  _handleTransitionToSuccessVotePage = () => {
    this.props.navigator.push({
      name: 'SuccessVotingScreen',
      passProps: {
        storeId: this.props.storeId,
      },
    })
  }




  _handleListSelect = (npo) => {
    console.log("Handling a select gesture", npo, this.refs);
    this.setState({
      selected: npo.name,
      voteButtonDisabled: false,
    });
    console.log(this.state);
  }

  _handleSearch = () => {
    console.log("Handle search input", this.state, this.refs);
    let inputText = this.state.searchable;
    console.log("Retrieved Search Text", inputText);
    this.setState({search:inputText});
  }

  updateState = (e)=>{
    console.log("updateState",e.nativeEvent);
    this.setState({searchable: e.nativeEvent.text});
  }

  aContainsB (a, b) {
    return a.indexOf(b) >= 0;
  }


      componentDidMount() {
        console.log("votingscreenmany componentDidMount");
        InteractionManager.runAfterInteractions(() => {
          this.setState({renderPlaceholderOnly: false});
        });
      }


  render(){
    console.log(this.props, this.state, "From Voting Screen");
    const npos = this._getAllNPOsForStore();
    console.log("All npos", npos);

    if (this.state.renderPlaceholderOnly) {
    return (<Container>
              <Content>
                  <Spinner color='green' />
              </Content>
          </Container>);
    }

    //TODO make search work later
    return (
      <Container>
        <Header searchBar rounded>
            <Item>
                <Icon name="search" />
                <Input placeholder="Search Non-Profit" onref="searchInput" onChange={this.updateState}/>
                <Icon active name="md-notifications-outline" />
            </Item>
            <Button transparent onPress={this._handleSearch}>
                <Text>Search</Text>
            </Button>
        </Header>

        <Content style={styles.centerContent}>
          <List dataArray={npos} renderRow={(npo) =>{

                        if(!this.aContainsB(npo.name,this.state.search) && this.state.search) return null;
                        return (<ListItem selected={npo.name == this.state.selected?true:false} onPress={() => this._handleListSelect(npo)}>
                            <Text>{npo.name}</Text>
                            <Right>
                              <Radio selected={npo.name == this.state.selected?true:false}/>
                            </Right>
                        </ListItem>)
                        }
                    }/>
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
