import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';

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

import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    List,
    ListItem,
    Item,
    Input,
    Text,
    Radio,
    Spinner
} from 'native-base';

import {Col, Row, Grid} from 'react-native-easy-grid';

//Voting screen needs to have Atleast 3 top NPO's. And a way to get more NPO.
//Works on this.state.selected..
export default class NPODetailScreen extends Component {

    //Slect nothing initially
    constructor(props) {
        super(props);
        console.log("Constructor-NPODetailScreen--", this.props);
        //TODO remove this => This will be given from the previous screen!!!!!!!! (@Jeffs service)
        let npoDetailData = {
            "nonProfitID": "0c0b0772-6b80-4355-82c6-3a64278b8733",
            "name": "UNICEF",
            "nonProfitType": "Sustainability",
            "storeNbr": 100,
            "voteable": true,
            "top3": false
        };
        this.state = {
            npoData: npoDetailData,
            renderPlaceholderOnly: true
        };


        console.log("Constructor-NPODetailScreen-After Fake Data-", this.props);
    }

    //Return back to the home page again.
    _transitionToHomeAgain = () => {
        this.props.navigator.push({name: 'Main'})
    }

    componentDidMount() {
        console.log("NPODetailScreen componentDidMount");
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    render() {
        console.log(this.props, this.state, "From NPO Detail Screen");

        if (this.state.renderPlaceholderOnly) {
            return (
                <Container>
                    <Header>
                        <Body>
                            <Title>
                                Edit NPO Detail
                            </Title>
                        </Body>
                    </Header>
                </Container>
            );
        }

        //TODO make search work later
        return (
            <Container>
              <Header>
                  <Body>
                      <Title>
                          Edit NPO Detail
                      </Title>
                  </Body>
              </Header>

                <Content>
                  <Text>
                    {JSON.stringify(this.state.npoData)}
                  </Text>
                </Content>

            </Container>

        )
    }

}

const styles = {
    centerContent: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    customButton: {
        padding: 20,
        margin: 20
    }
}
