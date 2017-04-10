import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Gallery from '../components/gallery/Gallery';
import { actions as accountActions } from '../actions/account';


class GalleryContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
          <Gallery
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

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);