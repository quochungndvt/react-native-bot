import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Setting from '../components/setting/Setting';
import { actions as accountActions } from '../actions/account';


class SettingContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
          <Setting
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);