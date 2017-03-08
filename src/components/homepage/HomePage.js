
import React, { Component } from 'react';
import {
  View,
  Navigator,
  TouchableOpacity,
  Text,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  PixelRatio,
  TextInput  
} from 'react-native';
import Login from  './Login';
import Signup from  './Signup';
import ForgotPassword from  './ForgotPassword';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screneType: ''
    };
    this.renderScene = this.renderScene.bind(this);
    this.onPressHandle = this.onPressHandle.bind(this);
  }
  componentWillMount() {
    // Animate creation
    //LayoutAnimation.spring();
  }
  onPressHandle(name){
    //LayoutAnimation.spring();
    this.setState({screneType:name});
  }
  renderScene() {
    const {
      account: { isLogin }
    } = this.props;
    //if (isLogin) return <ChooseGroup {...this.props} title="ChooseGroup" />;
    const screneType = this.state.screneType;
    switch (screneType) {
      case 'Login':
        return (<Login {...this.props} onPressHandle={this.onPressHandle} title="Login" />);
      case 'Signup':
        return (<Signup {...this.props} onPressHandle={this.onPressHandle} title="Signup" />);
      case 'ForgotPassword':
        return (<ForgotPassword {...this.props} onPressHandle={this.onPressHandle} title="ForgotPassword" />);
      default:
        return (<Login {...this.props} onPressHandle={this.onPressHandle} title="Login" />);
    }
  }
  render() {
    const {
      account: { isLogin, user_data }, onLogout
    } = this.props;
      return (
        <View style={{flex: 1}}>{this.renderScene()}</View>
      );
    }
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgb(126, 239, 204)',
    flex: 1,
  },
  wapperTitle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {  
    fontSize: 100,
    fontFamily: 'Karla-Bold',    
    letterSpacing: -2,
    color: 'rgb(0, 0, 0)',
  },
  contentHome: {
    flex: 3,
    backgroundColor: 'rgb(0, 0, 0)',
    flexDirection: 'column'
  },
  formWapper: {
    flex: 1,
    flexDirection: 'row'
  },
  inputWapper: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    backgroundColor: 'rgb(0, 0, 0)',
    height: 46,
    lineHeight: 46,
    borderColor: 'rgb(0, 0, 0)',
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth:2,
    fontFamily: 'Karla-Regular',
    marginRight: 35,
    color: 'rgb(255, 255, 255)',
    flex: 1,
  },
  inputLabel: {
    color: 'rgb(184, 166, 228)',
    fontFamily: 'Karla-Bold',
    fontSize: 20,
  },
  icon: {
    color: 'rgb(184, 166, 228)',
    fontFamily: 'Karla-Bold',
    fontSize: 20,
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  right: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 3,
  },
  buttonWapper: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 35
  },
  button: {
    backgroundColor: 'rgb(184, 166, 228)',
    justifyContent: 'center',
  },
  footerWapper: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  createWapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgotWapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  create: {
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Karla-Bold',
  },
  forgot: {
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Karla-Bold',    
  }
});


export default HomePage;
