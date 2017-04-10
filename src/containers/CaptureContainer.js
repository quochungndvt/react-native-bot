import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Capture from '../components/capture/Capture';
import { actions as accountActions } from '../actions/account';


class CaptureContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
          <Capture
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

export default connect(mapStateToProps, mapDispatchToProps)(CaptureContainer);