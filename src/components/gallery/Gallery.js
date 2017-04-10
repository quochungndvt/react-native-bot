
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  PixelRatio,
  TextInput,
  Image
} from 'react-native';

import Button from '../../common/FDButton';
import Icon from '../../common/FDIcon';

class Gallery extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      containerView
    } = styles;
      return (
        
          <View style={[containerView]}>            
            <View style={styles.topWrap}>
                <Text style={styles.topLabel}>Francolin Def</Text>
            </View>
            <Text style={styles.cicle}><Icon name='ios-checkmark-outline' /></Text>
            <View style={styles.avatarWrap}><Image source={require('../../asset/image/avatar.jpg')} style={styles.avatar}/></View>
            <View style={styles.contentWrap}>
                <View style={styles.leftContent}>
                    <View style={styles.infoWrap}>
                        <View style={styles.lineWrap}><Text style={styles.textInfo}>Product Manager</Text></View>
                        <View style={styles.lineWrap}><Text style={styles.textInfo}>Vung Tau</Text></View>
                    </View>
                    <View style={styles.descriptionWrap}>
                        <Text style={styles.textLabel}>Founder of this app, likes food, photography, and exploreing awesome places</Text>
                    </View>
                </View>
                <View style={styles.rightContent}>
                    <View style={styles.rightContentWrap}>
                        <View style={styles.lineWrap}><Text style={styles.rightTextInfo}>145K</Text></View>
                        <View style={styles.lineWrap}><Text style={styles.rightTextLabel}>FOLLOWERS</Text></View>
                    </View>
                    <View style={styles.rightContentWrap}>
                        <View style={styles.lineWrap}><Text style={styles.rightTextInfo}>1,679</Text></View>
                        <View style={styles.lineWrap}><Text style={styles.rightTextLabel}>FOLLOWING</Text></View>
                    </View>
                    <View style={styles.rightContentWrap}>
                        <View style={styles.lineWrap}><Text style={styles.rightTextInfo}>765</Text></View>
                        <View style={styles.lineWrap}><Text style={styles.rightTextLabel}>LIKES</Text></View>
                    </View>
                </View>
            </View>
            <View style={styles.footerWrap}>
                <View style={styles.footerItem}><Icon name='ios-chatbubbles-outline' /></View>
                <View style={styles.footerItem}><Icon name='ios-call-outline' /></View>
                <View style={styles.footerItem}><Icon name='ios-camera-outline' /></View>
            </View>
          </View>
        
      );
    }
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    //backgroundColor: 'rgb(126, 239, 204)',
    flex: 1,
  },
  topWrap: {
    flex: 2,
    backgroundColor: 'rgb(126, 239, 204)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  topLabel: {
    fontSize: 30,
    fontFamily: 'Karla-Bold',
    color: '#000',
    marginLeft: 35,
    marginTop: 30,
    marginBottom: 75,
    width: 140,
    letterSpacing: -1.2
  },
  cicle: {
    backgroundColor: 'rgb(184, 166, 228)',
    borderRadius: 60,
    width: 60,
    height: 60,
    position: 'absolute',
    left: 35,
    top: 95,
    zIndex: 1,
    paddingTop: 15,
    paddingLeft: 25,
    color: '#fff'
  },
  avatarWrap: {
    borderRadius: 60,
    width: 300,
    height: 300,
    position: 'absolute',
    left: 35,
    top: 95,
    zIndex: 1,
    paddingTop: 15,
    paddingLeft: 25,
  },
  avatar: {

  },
  contentWrap: {
    flex: 4,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContent: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  infoWrap: {
    alignItems: 'flex-start',
    marginLeft: 35,
    paddingBottom: 40
  },
  lineWrap: {
    marginTop: 9
  },
  textInfo: {
    color: '#fff',
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    lineHeight: 18
  },
  descriptionWrap: {
    alignItems: 'flex-start',
    marginLeft: 35,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 40
  },
  textLabel: {
    color: 'rgb(184, 166, 228)',
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    lineHeight: 18
  },
  rightContent: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 35
  },
  rightContentWrap: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  rightTextInfo: {
    color: '#fff',
    fontFamily: 'Karla-Regular',
    alignItems: 'flex-end',
    fontSize: 25,
    lineHeight: 18
  },
  rightTextLabel: {
    color: 'rgb(184, 166, 228)',
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 2.4
  },
  footerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default Gallery;
