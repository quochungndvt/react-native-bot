import React, { Component } from 'react';
import { View, Button } from 'react-native';
import Icon from './Icon';

class Footer extends Component {
  constructor(props) {
        super(props);
        this.goForward = this.goForward.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = {
          newRoute: false
        };
  }
  goBack() {
    //this.setState({ newRoute: true });
    this.props.navigator.jumpBack();
  }
  goForward() {
    //this.setState({ newRoute: true });
    this.props.navigator.jumpForward();
  }
  goReplace(name) {
    this.props.navigator.replace(name);
  }

  render() {
    const { drawer, currentGroup, navigator } = this.props;
    console.log('props footer', this.props);
    return (
        <View>
          {
            //navigator.state.routeStack.length > 1 &&
            <Button onPress={() => this.goBack()} title={""}>
                <Icon name='ios-arrow-back-outline' />
            </Button>
          }
          {
            //navigator.state.routeStack.length > 1 &&
            <Button onPress={() => this.goForward()} title={""}>
                <Icon name='ios-arrow-forward-outline' />
            </Button>
          }
          <Button onPress={() => this.goReplace('searchExploit')} title={""}>
              <Icon name='ios-search-outline' />
          </Button>
          <Button onPress={() => this.goReplace('addExploit')} title={""}>
              <Icon name='ios-add-circle-outline' />
          </Button>
        </View>
    );
  }
}

export { Footer };
