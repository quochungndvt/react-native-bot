import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from '../components/map/Map';
import { actions as accountActions } from '../actions/account';


class MapContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
          <Map
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

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);