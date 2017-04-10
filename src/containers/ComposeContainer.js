import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Compose from '../components/compose/Compose';
import { actions as accountActions } from '../actions/account';


class ComposeContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
          <Compose
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

export default connect(mapStateToProps, mapDispatchToProps)(ComposeContainer);