'use strict';

import React, { Component, PropTypes } from 'react';
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
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Radio, Spinner } from 'native-base';

import Camera from 'react-native-camera';


export default class QRCodeScanner extends Component {
  static propTypes = {
    onRead: PropTypes.func.isRequired,
    reactivate: PropTypes.bool,
    reactivateTimeout: PropTypes.number,
    fadeIn: PropTypes.bool,
    showMarker: PropTypes.bool,
    customMarker: PropTypes.element,
    topContent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    bottomContent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    onRead: () => (console.log('QR code scanned!')),
    reactivate: false,
    reactivateTimeout: 0,
    fadeIn: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      fadeInOpacity: new Animated.Value(0),
      renderPlaceholderOnly: true,
      showCamera: true,
    }

    this._handleBarCodeRead = this._handleBarCodeRead.bind(this);
  }




  componentDidMount() {
    //Fade in is not true.
    if (this.props.fadeIn) {
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(
         this.state.fadeInOpacity,
         {
           toValue: 1,
           easing: Easing.inOut(Easing.quad),
         },
        )
      ]).start();
    }

    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
   }

  _setScanning(value) {
    this.setState({ scanning: value });
  }

  _handleBarCodeRead(e) {
    Vibration.vibrate();
    this.setState({showCamera:false});
    if (!this.state.scanning) {
      console.log("event:   ", e);
      this._setScanning(true);
      this.props.onRead(e)
      if (this.props.reactivate) {
        setTimeout(() => (this._setScanning(false)), this.props.reactivateTimeout);
      }
    }
    return;
  }

  _renderTopContent() {
    if (this.props.topContent) {
      return this.props.topContent;
    }
    return null;
  }

  _renderBottomContent() {
    if (this.props.bottomContent) {
      return this.props.bottomContent;
    }
    return null;
  }

  _renderCameraMarker() {
    return (
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle}/>
      </View>
    )
  }

  _renderCamera() {
    if (this.props.fadeIn) {
      return (
        <Animated.View
          style={{
            opacity: this.state.fadeInOpacity,
            backgroundColor: 'transparent'
        }}>
          <Camera style={styles.camera} onBarCodeRead={this._handleBarCodeRead.bind(this)}>
            {this._renderCameraMarker()}
          </Camera>
        </Animated.View>
      )
    }
    return (
      <Camera style={styles.camera} onBarCodeRead={this._handleBarCodeRead.bind(this)}>
        {this._renderCameraMarker()}
      </Camera>
    )
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
            <Title>
              Scan QR Code
            </Title>
          </Body>
        </Header>

        <Content>
          {this.state.showCamera?this._renderCamera():null}
        </Content>

      </Container>
    )
  }
}

/*

        <Footer>
            {this._renderBottomContent()}
        </Footer>
<View style={{
    flex: 1,
    marginTop: 64,
  }}>
  <View style={styles.infoView}>
    {this._renderTopContent()}
  </View>
  {this._renderCamera()}
  <View style={styles.infoView}>
    {this._renderBottomContent()}
  </View>
</View>
*/

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
