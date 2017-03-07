import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlexBox from '../components/FlexBox';
import { actions as accountActions } from '../actions/account';


class HomeContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
          <FlexBox
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
