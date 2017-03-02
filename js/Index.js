'use strict';

var React = require('react-native');


var React1 = require('react');


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
} = React;

console.log("##########Trying to import Index");

var Index = React1.createClass({

  render: function() {
    return (
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={this._onPressQRCode}>
          <Text>Read QRCode</Text>
        </TouchableOpacity>
      </View>
    );
  },

  _onPressQRCode: function() {
    this.props.navigator.push({
      component: QRCodeScreen,
      title: 'QRCode',
      passProps: {
        onSucess: this._onSucess,
      },
    });
  },

  _onSucess: function(result) {
    console.log(result);
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});



module.exports = Index;
