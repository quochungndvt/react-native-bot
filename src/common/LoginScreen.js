import React, {Component} from 'react';
import {
  View, TextInput, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import HFButton from '../common/HFButton';
import LinearGradient from 'react-native-linear-gradient';

class HFLoginScreen extends Component{
	constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }
  onChange(data,key){
    const {onChangeAccount} = this.props
    onChangeAccount(data, key)
    if(key=='email') this.setState({email:data})
    if(key=='password') this.setState({password:data})
  }
	render (){
    const {onLoginSubmit, onChangeAccount, account: {user_data, isLogin},isLoggedIn} = this.props
		return (
        <View style={styles.formLogin}>
          <Text style={styles.label}>Vui lòng đăng nhập!</Text>
          <TextInput
            style={{height: 40, backgroundColor: '#fff'}}
            onChangeText={(email) => this.onChange(email,'email')}
            value={this.state.email}
            placeholder={'Nhập email'}
          />
          <TextInput
            style={{height: 40, backgroundColor: '#fff'}}
            onChangeText={(password) => this.onChange(password,'password')}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={'Nhập mật khẩu'}
          />
          <View style={{height: 30}} />

              <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                <Text style={styles.buttonText} onPress={onLoginSubmit}>
                  Đăng nhập
                </Text>
              </LinearGradient>

        </View>
		)
	}
}
let styles = StyleSheet.create({
  formLogin: {
    marginTop: 30,
    backgroundColor: 'rgba(51,51,51,0.8)',
    padding: 20,
  },
  label: {
    color: '#fff'
  },
  button: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#fff'
  },
  linearGradient: {
    //flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    //fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
})

export default HFLoginScreen
