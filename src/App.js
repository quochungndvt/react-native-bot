'use strict';

import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, AppState, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Navigator from './Navigator';
import PushNotificationsController from './PushNotificationsController';
//import CodePush from "react-native-code-push";
import PushController from "./PushController";
import firebaseClient from  "./FirebaseClient";

class HFApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ""
    }
    this.onChangeToken = this.onChangeToken.bind(this);
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    //CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      //CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
    }
  }
  onChangeToken (token){
    this.setState({token: token || ""})
  }
  testFireBase(registrationToken){
    // admin.messaging().sendToDevice(registrationToken, payload, options)
    // .then(function(response) {
    //   console.log("Successfully sent message:", response);
    // })
    // .catch(function(error) {
    //   console.log("Error sending message:", error);
    // });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.5)"
          barStyle="default"
        />
        <Navigator {...this.props} />
        <PushNotificationsController />
        <PushController
          onChangeToken={this.onChangeToken}
        />
        {/*<Text style={styles.welcome}>
          Welcome to Simple Fcm Client!
        </Text>

        <Text style={styles.instructions}>
          Token: {this.state.token}
        </Text>

        <TouchableOpacity onPress={() => firebaseClient.sendNotification(this.state.token)} style={styles.button}>
          <Text style={styles.buttonText}>Send Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => firebaseClient.sendData(this.state.token)} style={styles.button}>
          <Text style={styles.buttonText}>Send Data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => firebaseClient.sendNotificationWithData(this.state.token)} style={styles.button}>
          <Text style={styles.buttonText}>Send Notification With Data</Text>
        </TouchableOpacity>*/}
      </View>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: "teal",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 15,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    backgroundColor: "transparent"
  },
});
function select(store) {
  return {
    isLoggedIn: store.isLogin,
  };
}
const mapStateToProps = state => ({
    account: state.account,
    group: state.group,
    register: state.register,
});

module.exports = connect(select, mapStateToProps)(HFApp);
