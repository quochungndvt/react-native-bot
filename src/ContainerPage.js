import React, { Component } from 'react';
import { View, Text, StatusBar, Platform} from 'react-native';
import HeaderContainer from './containers/common/HeaderContainer';
import { Footer } from './common';

class ContainerPage extends Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={styles.headerContent}>
          <HeaderContainer {...this.props} />
        </View>
        <View style={styles.containerPage}>
          {this.props.children}
        </View>
         <View style={styles.footerContent}>
          <Footer {...this.props} />
         </View>
      </View>
    );
  }
}

const styles = {
  containerPage: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#f1f5f8',
  },
  headerContent: {
    height: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight + 50
  },
  footerContent: {

  }
};

export default ContainerPage;
