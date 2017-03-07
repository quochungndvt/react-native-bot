import React, { Component } from 'react';
import { View, Platform, StatusBar, Button, Text } from 'react-native';
import Icon from './Icon';
class Header extends Component {
  render() {
    const { drawer, navigator } = this.props;    
    return (
      <View style={styles.containerHeader}>
        <Button transparent onPress={() => drawer.openDrawer()} title={"Menu"}>
            <Icon name='ios-menu' style={styles.styleIcon} />
        </Button>
      </View>
    );
  }
}
const styles = {
  containerHeader: {
    backgroundColor: '#ffdb1b',
    paddingTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  styleIcon: {
    color: '#000',
    backgroundColor: 'transparent',
    fontSize: 26
  }
};
export default Header;
