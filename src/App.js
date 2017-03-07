'use strict';

import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, AppState } from 'react-native';
import { connect } from 'react-redux';
import Navigator from './Navigator';
//import CodePush from "react-native-code-push";

class HFApp extends Component {
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
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.5)"
          barStyle="default"
        />
        <Navigator {...this.props} />
      </View>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: store.account.isLogin,
  };
}
const mapStateToProps = state => ({
    account: state.account,
    group: state.group,
    register: state.register,
});

module.exports = connect(select, mapStateToProps)(HFApp);
