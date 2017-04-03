import React, { Component } from 'react';
import { View, Platform, StatusBar, Button, Text, TouchableOpacity } from 'react-native';
import Icon from './FDIcon';
import { iconStyle } from '../utils/common';
class Header extends Component {
  render() {
    return (
      <View style={styles.containerHeader}>
        <View style={styles.menuWrap}>
          <TouchableOpacity            
            onPress={() => this.props.openDrawer()} 
            >
            <Icon name='ios-menu-outline' {...iconStyle.style3} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.moreWrap}>
          
        </View>
      </View>
    );
  }
}
const styles = {
  containerHeader: {
    backgroundColor: '#000',
    paddingTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  menuWrap: {
    flex: 1,
    alignItems: 'flex-start'

  },
  titleWrap: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Karla-Regular',
    fontSize: 17,
    color: '#fff'
  },
  moreWrap: {
    flex: 1
  }
};
export default Header;
