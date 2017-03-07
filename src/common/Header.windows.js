import React, { Component } from 'react';
import { View, Platform, StatusBar, Button, Text } from 'react-native';
import HFIcon from './HFIcon';
class HFHeader extends Component {
  render() {
    const { drawer, currentGroup, navigator } = this.props;
    console.log("_____StatusBar.currentHeight",StatusBar.currentHeight);
    return (
      <View style={styles.containerHeader}>
        <Button transparent onPress={() => drawer.openDrawer()} title={""}>
            <HFIcon name='ios-menu' style={styles.styleIcon} />
        </Button>
         <Text>{currentGroup}</Text>
         <Button transparent title={""}>
            <HFIcon name='ios-notifications-outline' style={styles.styleIcon} />
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
export default HFHeader;
