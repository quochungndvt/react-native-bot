
import 'whatwg-fetch';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
var Parse = require('parse/react-native');
import App from './App';
import configureStore from './stores/configureStore';
import storage from './utils/store';
import FacebookSDK from './FacebookSDK';
var {serverURL} = require('./env');

function setup(): ReactClass<{}> {
  console.disableYellowBox = true;
  Parse.initialize('oss-f8-app-2016');
  Parse.serverURL = `${serverURL}/parse`;

  FacebookSDK.init();
  Parse.FacebookUtils.init();
  class Root extends Component {
      constructor() {
        super();
        this.state = {
          isLoading: true,
          store: configureStore(() => this.setState({ isLoading: false })),
        };
      }
      state: {
        isLoading: boolean;
        store: any;
      };

      render() {
        if (this.state.isLoading) {
          return null;
        }

        return (
          <Provider store={this.state.store}>
            <App />
          </Provider>
        );
      }
  }
  return Root;
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};

module.exports = setup;