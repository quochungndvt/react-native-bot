import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Stats from '../components/stats/Stats';
import { actions as accountActions } from '../actions/account';


class StatsContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
          <Stats
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

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);