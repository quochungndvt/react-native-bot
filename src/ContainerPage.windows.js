import React, { Component } from 'react';
import { View, Text} from 'react-native';
import HeaderContainer from './containers/common/HeaderContainer';
import HFFooter  from './common/Footer';

class ContainerPage extends Component {
  render() {
    return (
      <View >
        <View>
          <HeaderContainer {...this.props} />
        </View>
        <View style={styles.containerPage}>
          {this.props.children}
        </View>
         <View>
          <HFFooter {...this.props} />
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
  }
};

export default ContainerPage;
