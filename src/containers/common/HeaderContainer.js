import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../common/Header';
import { actions as accountActions } from '../../actions/account';

class HeaderContainer extends Component {
  render() {
    console.log(this.props,"+++++++++++++++++++++++++");
    return (
      <Header
        title={'title header'}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  accountActions: bindActionCreators(accountActions, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
