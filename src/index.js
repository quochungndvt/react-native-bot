
import 'whatwg-fetch';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './stores/configureStore';
import storage from './utils/store';

class Main extends Component {
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

export default Main;
