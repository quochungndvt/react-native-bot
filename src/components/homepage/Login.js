
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  PixelRatio,
  TextInput,
  Animated
} from 'react-native';

import * as common from '../../common';
import FDButton from '../../common/FDButton';
import FDIcon from '../../common/FDIcon';
import LoginButton from '../../common/LoginButton';
import { iconStyle } from '../../utils/common';

console.log(common,"++++++++++++++++++++++++")
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
  }
  
  render() {
    const {
      containerView, contentHome
    } = styles;
      return (
        
          <View style={[containerView]}>            
            <View style={styles.wapperTitle}>
              <Text style={styles.headerTitle}>{"Chat"}</Text>
            </View>
            <View style={contentHome}>
              <View style={styles.formWapper}>
                <View style={styles.left}><FDIcon name='ios-person-outline' {...iconStyle.style1} /></View>
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
              <View style={styles.formWapper}>
                <View style={styles.left}><FDIcon name='ios-lock-outline' {...iconStyle.style1} /></View>
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
              <View style={styles.buttonWapper}>
                <FDButton 
                //style={styles.button}
                onPress={() => this.props.openDrawer()}
                type="primary"
                caption={'Get started'}/>
                <Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
                  <Text style={styles.loginComment}>
                    Login with Facebook.
                  </Text>
                  <LoginButton source="First screen" />
                </Animated.View>
              </View>
              <View style={styles.footerWapper}>
                <View style={styles.createWapper}><Text style={styles.create} onPress={() => this.props.onPressHandle('Signup')}>Create Account</Text></View>
                <View style={styles.forgotWapper}><Text style={styles.forgot} onPress={() => this.props.onPressHandle('ForgotPassword')}>Forgot Password</Text></View>
                
              </View>
            </View>
          </View>
        
      );
    }
    fadeIn(delay, from = 0) {
      const {anim} = this.state;
      return {
        opacity: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
        transform: [{
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        }],
      };
    }
}

const scale = Dimensions.get('window').width / 375;


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


export default Login;
