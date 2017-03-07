
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
  //DeviceEventEmitter
} from 'react-native';

import BackgroundImage from  './BackgroundImage';
import Button from '../../common/Button';
import Cube from './Cube';
const _window = Dimensions.get('window');

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleHeight: Dimensions.get('window').height,
      screneType: ''
    };
    this.renderScene = this.renderScene.bind(this);
    this.onPressHandle = this.onPressHandle.bind(this);
  }
  componentWillMount() {
    // Animate creation
    LayoutAnimation.spring();
  }
  onPressHandle(name){
    LayoutAnimation.spring();
    this.setState({screneType:name});
  }
  renderScene() {
    const {
      account: { isLogin }
    } = this.props;
    if (isLogin) return <ChooseGroup {...this.props} title="ChooseGroup" />;
    const screneType = this.state.screneType;
    switch (screneType) {
      case 'Login':
        return (<Login {...this.props} onPressHandle={this.onPressHandle} title="Login" />);
      case 'Signup':
        return (<Signup {...this.props} onPressHandle={this.onPressHandle} title="Signup" />);
      case 'ForgetPass':
        return (<ForgetPass {...this.props} onPressHandle={this.onPressHandle} title="ForgetPass" />);
      default:
        return (<Login {...this.props} onPressHandle={this.onPressHandle} title="Login" />);
    }
  }
  render() {
    const {
      account: { isLogin, user_data }, onLogout
    } = this.props;
    const {
      containerView, boxHi, nameU, txtLogout, logout, contentHome
    } = styles;
      return (
        
          <View style={[containerView]}>
            
            <Cube />
            <View>
              <Text style={styles.headerTitle}>{"Chat"}</Text>
              
            </View>
            <View style={{flex:1}}>
              <Text>{"width:"+_window['width']}</Text>
              <Text>{"width:"+_window['height']}</Text>
              <Text>{"PixelRatio:"+PixelRatio.get()}</Text>
              <Text>{"getPixelSizeForLayoutSize 200:"+PixelRatio.getPixelSizeForLayoutSize(200)}</Text>
              <Text>{"getFontScale 0:"+PixelRatio.getFontScale(0)}</Text>
            </View>
            <View style={contentHome}>
              <View>
                <View style={styles.left}><Text style={styles.icon}>ICON</Text></View>
                <View style={styles.right}><Text style={styles.inputLabel}>USERNAME</Text>
                  <View style={styles.inputWapper}>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    autoCorrect
                    placeholder={'abc@domain.com'}
                    placeholderTextColor='rgb(255, 255, 255)'
                    style={styles.inputStyle}            
                    />
                  </View>
                  </View>
              </View>
              <View>
                <View style={styles.left}><Text style={styles.icon}>ICON</Text></View>
                <View style={styles.right}><Text style={styles.inputLabel}>PASSWORD</Text>
                  <View style={styles.inputWapper}>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    autoCorrect
                    secureTextEntry={true}
                    placeholder={'*****'}
                    placeholderTextColor='rgb(255, 255, 255)'
                    style={styles.inputStyle}                
                    />
                  </View>
                </View>
                </View>
            </View>
            <Button style={styles.button} 
            caption={'Get started'}/>
          </View>
        
      );
    }
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: 'rgb(126, 239, 204)',
    flex: 1,
  },
  wapperTitle: {
    position: 'absolute',
  },
  headerTitle: {  
    fontSize: 100,
    fontFamily: 'Karla-Bold',
    top: 130,
    alignItems: 'center',
    height: 152,
    letterSpacing: -2,

  },
  contentHome: {
    flex: 2,
    top: 305,
    backgroundColor: 'rgb(0, 0, 0)',
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
    paddingLeft: 60,
    paddingRight: 20,
    fontFamily: 'Karla-Regular',
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
    //alignItems: 'flex-start',
    flexDirection: 'column'
  },
  right: {
    //alignItems: 'center',
    left: 209,
    flexDirection: 'column'
  },
  button: {
    backgroundColor: 'rgb(184, 166, 228)',
    //color: 'rgb(0, 0, 0)',
    fontSize: 26,
    fontFamily: 'Karla-Bold',
    justifyContent: 'center',
    
  }
});


export default HomePage;
