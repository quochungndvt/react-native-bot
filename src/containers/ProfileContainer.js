import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from '../components/profile/Profile';
import { actions as accountActions } from '../actions/account';
class ProfileContainer extends Component {
    constructor(props) {
        super(props);       
    }
    render() {
      return (
          <Profile
            {...this.props}           
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
