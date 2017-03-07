import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../components/homepage/HomePage';
import { actions as accountActions } from '../actions/account';
import { ValidateInput } from '../common/ValidateInput';

let temp = '';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          checkError: false,
          checkMessage: '',
          inputSuccess: true,
          inputError: true
        };
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onLogoutSubmit = this.onLogoutSubmit.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.handleSubmitResetPass = this.handleSubmitResetPass.bind(this);        
    }
    componentWillMount() {
      
    }
    componentDidMount() {
        
    }

    onLoginSubmit() {
        const {
          accountActions: { login },
          account: { email, password },
          groupActions: { getInfo }
        } = this.props;
        const self = this;
        const validMess = ValidateInput({ email: email.trim(), password });
        if (validMess === true) {
          login(email, password, (res) => {
            getInfo();
            //self.props.navigator.push({ name: 'ChooseGroup' });
            self.onChangeAccount('', 'email');
            self.onChangeAccount('', 'password');
          });
        } else {
          Alert.alert(
            'Thông báo',
            validMess,
            [
              { text: 'OK', onPress: () => {} },
            ]
          );
        }
    }
    onLogoutSubmit() {
        const { accountActions: { logout } } = this.props;
        logout();
    }
    onLogout() {
       const self = this;
       const { accountActions: { logout } } = this.props;
       console.log('props', this.props);
       logout(() =>{}
           //self.props.navigator.replace({ name: 'login' })
           //location.reload();
       );
    }

    handleSubmitRegister() {
       const self = this;
       const {
         registerActions: { change },
         accountActions: { register },
         register: { email, fullname, password }
       } = this.props;
       const changeGroup = self.props.groupActions.change;
       const changeRegister = self.props.registerActions.change;
       //const mail = email.toLowerCase();
       const validMess = ValidateInput({ email: email.trim(), password, fullname });
       if (validMess === true) {
         register(email, password, fullname, (res) => {
           if (res.err) {
             change('emailError', true);
             Alert.alert(
               'Thông báo',
               res.message,
               [
                 { text: 'OK', onPress: () => {} },
               ]
             );
           } else {
             changeGroup('groupName', fullname);
             changeRegister('email', '');
             changeRegister('password', '');
             changeRegister('fullname', '');
             self.props.navigator.replace({ name: 'ChooseGroup' });
           }
         });
       } else {
         Alert.alert(
           'Thông báo',
           validMess,
           [
             { text: 'OK', onPress: () => { console.log('OK Pressed!'); } },
           ]
         );
       }
   }
   handleSubmitResetPass() {
      const self = this;
        const {
          accountActions: { recovery },
          account: { recoveryEmail }
        } = this.props;
        let email = recoveryEmail.trim();
        email = email.toLowerCase();
        const validMess = ValidateInput({ email });
        if (validMess === true) {
          recovery(email, (res) => {
            if (res.err) {
              self.setState({ checkError: true, checkMessage: res.message });
              Alert.alert(
                'Thông báo',
                res.message,
                [
                  { text: 'OK', onPress: () => {} },
                ]
              );
            } else {
              self.setState({ checkError: false, checkMessage: res.message });
              Alert.alert(
                'Thông báo',
                `Mật khẩu mới đã được gửi tới email:  ${recoveryEmail}`,
                [
                  { text: 'OK',
                    onPress: () => {
                      self.props.navigator.replace({ name: 'Login' });
                  } },
                ]
              );
              self.onChangeAccount('', 'recoveryEmail');
            }
          });
        } else {
          Alert.alert(
            'Thông báo',
            validMess,
            [
              { text: 'OK', onPress: () => {} },
            ]
          );
          self.setState({ checkError: true, checkMessage: 'Email không hợp lệ!' });
        }
    }
    
    render() {
      return (
          <HomePage
            {...this.props}
            {...this.state}
              onLoginSubmit={this.onLoginSubmit}  
              onLogoutSubmit={this.onLogoutSubmit}
              handleSubmitRegister={this.handleSubmitRegister}
              onLogout={this.onLogout}
              handleSubmitResetPass={this.handleSubmitResetPass}            
          />
      );
    }
}
const mapStateToProps = state => ({
    account: state.account,
});

const mapDispatchToProps = dispatch => ({    
    accountActions: bindActionCreators(accountActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
