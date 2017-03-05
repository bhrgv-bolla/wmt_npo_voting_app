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

var t = require('tcomb-form-native'); //trying out tcomb form native

var _ = require('lodash');

//Building a form here
var Form = t.form.Form;

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textbox.normal.padding = 5;
stylesheet.textboxView.normal.marginLeft = 5;
stylesheet.textboxView.normal.marginRight = 5;
stylesheet.formGroup.normal.flex = 1;

var NPOForm = t.struct({storeNumber: t.Number, NonProfitOrganization: t.String, voteable: t.Boolean, isInTop3: t.Boolean});

var options = {
    stylesheet: stylesheet,
    fields: {
        storeNumber: {
            editable: false
        },
        NonProfitOrganization: {
            editable: false
        },
        isInTop3: {
            label: 'Is this Non-Profit in stores Top 3' // <= label for the name field
        }
    }
}; //Look in tcomb documentation.

//Voting screen needs to have Atleast 3 top NPO's. And a way to get more NPO.
//Works on this.state.selected..
export default class NPODetailScreen extends Component {

    //Slect nothing initially
    constructor(props) {
        super(props);
        console.log("Constructor-NPODetailScreen--", this.props);
        //TODO (@Jeffs service) remove this => This will be given from the previous screen!!!!!!!! as npo in the props!! Confirm
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

        console.log("Constructor-NPODetailScreen-After Fake Data-", this.props, t);
    }

    //Return back to the home page again.
    _transitionToHomeAgain = () => {
        this.props.navigator.push({name: 'Main'})
    }

    _handleNavigationBack = () => {
        this.props.navigator.pop();
    }

    //TODO To {@Jeffs Service} here need to make a rest call about the update on an NPO. (  )
    _saveForm = () => {
      console.log(value,"saveForm");
        var value = this.refs.form.getValue();
        if (value) {
            console.log(value);
        }
    }

    componentDidMount() {
        console.log("NPODetailScreen componentDidMount");
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    render() {
        console.log(this.props, this.state, "From NPO Detail Screen");

        //Building value
        let value = this.state.npoData;
        value.NonProfitOrganization = value.name;
        value.storeNumber = value.storeNbr;
        value.isInTop3 = value.top3;
        //End Building value

        if (this.state.renderPlaceholderOnly) {
            return (
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={this._handleNavigationBack}>
                                <Icon name='ios-arrow-back-outline'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                Edit NPO Details
                            </Title>
                        </Body>
                        <Right></Right>
                    </Header>
                </Container>
            );
        }


        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this._handleNavigationBack}>
                            <Icon name='ios-arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                            Edit NPO Details
                        </Title>
                    </Body>
                    <Right></Right>
                </Header>

                <Content style={styles.centerContent}>
                    <Form ref="form" type={NPOForm} options={options} value={value}/>
                    <Button block primary style={styles.customButton} onPress={this._saveForm}>
                        <Text>SAVE</Text>
                    </Button>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button full success onPress={this._transitionToHomeAgain}>
                            <Text>Back To Demo Start Screen</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>

        )
    }

}

/**
  <Text>
    {JSON.stringify(this.state.npoData)}
  </Text>
**/

const styles = {
    centerContent: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        padding: 20
    },
    customButton: {
        padding: 20,
        margin: 2
    }
}
