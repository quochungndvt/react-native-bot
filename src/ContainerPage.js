import React, { Component } from 'react';
import { View, Text, StatusBar, Platform} from 'react-native';
import { connect } from 'react-redux';
import HeaderContainer from './containers/common/HeaderContainer';
import { Footer } from './common';

class ContainerPage extends Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={styles.headerContent}>
          <HeaderContainer {...this.props} />
        </View>
        <View style={styles.containerPage}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = {
  containerPage: {
    flex:1,
  },
  headerContent: {
    height: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight + 50
  }
};
const mapStateToProps = (state) => ({
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(ContainerPage);
