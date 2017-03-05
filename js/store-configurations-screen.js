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
export default class StoreConfigurationsScreen extends Component {

  //Slect nothing initially
  constructor(props){
    super(props);
    this.state = {selected:null, voteButtonDisabled:true, search:'', renderPlaceholderOnly: true, storeId:null, storeConfigurationData:null};
  }

  //Right swipe more information. TODO time to call Jeff's service
  _getAllNPOsForStore = () => {
    console.log("Mehotd: AllNPOsForStore", this.state.storeId);
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




//TODO create a new detail NPO page.
  _handleTransitionToDetailNPOPage = (npo) => {
    console.log("Transition to the NPO detail page", npo)
    this.props.navigator.push({
      name: 'NPODetailScreen',
      passProps: {
        npo: npo,
      },
    })
  }



//TODO take to a new screen..... You need to get details page of the selected NPO. How about that. NPO properies are transferred.
  _handleListSelect = (npo) => {
    console.log("Handling a select gesture", npo, this.refs);
    this._handleTransitionToDetailNPOPage(npo);
  }

  _handleSearch = () => {
    console.log("Handle search input", this.state, this.refs);
    let inputText = this.state.searchable;
    console.log("Retrieved Search Text", inputText);
    this.setState({storeId:inputText});
    let data = this._getAllNPOsForStore();
    this.setState({storeConfigurationData:data});
  }

  updateState = (e)=>{
    console.log("updateState",e.nativeEvent);
    this.setState({searchable: e.nativeEvent.text});
  }



      componentDidMount() {
        console.log("votingscreenmany componentDidMount");
        InteractionManager.runAfterInteractions(() => {
          this.setState({renderPlaceholderOnly: false});
        });
      }



  render(){
    console.log(this.props, this.state, "From store configurations Screen");
    const npos = this._getAllNPOsForStore();
    console.log("All npos", npos);

    if (this.state.renderPlaceholderOnly || !(this.state.storeId && this.state.storeConfigurationData)) {//storeId if evaluated to false TODO change icon
    return (<Container>
        <Header searchBar rounded>
            <Item>
                <Icon name="search" />
                <Input placeholder="Lookup Store" onref="searchInput" onChange={this.updateState}/>
            </Item>
            <Button transparent onPress={this._handleSearch}>
                <Text style={{color:"#007bc4!important"}}>Lookup</Text>
            </Button>
        </Header>
              <Content>
                <Grid>
                  <Row size={1} style={{alignItems:"center", height:100}}>
                    <Col size={1}></Col>
                    <Col size={15}>
                    <Text style={{textAlign:"center"}}>
                      Waiting for a store id{'\n'}
                    </Text>
                    </Col>
                    <Col size={1}></Col>
                  </Row>
                  <Col>
                  <Spinner color='#007bc4' />
                  </Col>
                </Grid>

              </Content>
          </Container>);
    }

    //TODO make search work later
    return (
      <Container>
        <Header searchBar rounded>
            <Item>
                <Icon name="search" />
                <Input placeholder="Lookup Store" onref="searchInput" onChange={this.updateState}/>
            </Item>
            <Button transparent onPress={this._handleSearch}>
                <Text>Lookup</Text>
            </Button>
        </Header>

        <Content style={styles.centerContent}>
          <List dataArray={this.state.storeConfigurationData} renderRow={(npo) =>{
                        return (<ListItem style={{justifyContent:"center"}} onPress={() => this._handleListSelect(npo)}>
                            <Text>{npo.name}</Text>
                        </ListItem>)
                        }
                    }/>
        </Content>

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
