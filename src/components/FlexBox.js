
import React, { Component } from 'react';
import {
  View,
  Navigator,
  TouchableOpacity,
  Text,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  PixelRatio,
  TextInput
  //DeviceEventEmitter
} from 'react-native';
const _window = Dimensions.get('window');

class FlexBox extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // Animate creation
    LayoutAnimation.spring();
  }
  
  render() {
      return (
        <View style={{
          flexDirection: 'column', //'row', 'row-reverse', 'column', 'column-reverse'
          justifyContent: 'center', //flex-start, center, flex-end, space-around, and space-between
          alignItems: 'stretch', //flex-start, center, flex-end, and stretch,
          //flexWrap: 'wrap'//,nowrap | wrap | wrap-reverse;
          marginHorizontal: 10,
          marginVertical : 10,
          padding: 10,
          borderColor: '#000',
          borderWidth: 5,
          flex: 1
          }}>
          <View style={{
            backgroundColor: 'rgb(126, 239, 204)',
            alignSelf : 'stretch', //'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline',
            alignItems: 'center',
            position: 'absolute',
            top: 50
            
          }}>
            <Text>{"width:"+_window['width']}</Text>
            <Text>{"height:"+_window['height']}</Text>
            <Text>{"PixelRatio:"+PixelRatio.get()}</Text>
            <Text>{"getPixelSizeForLayoutSize 200:"+PixelRatio.getPixelSizeForLayoutSize(200)}</Text>
            <Text>{"getFontScale 0:"+PixelRatio.getFontScale(0)}</Text>
          </View>
            <View style={{ width: 50, height: 50, backgroundColor: 'steelblue', alignItems: 'center', justifyContent: 'center'}} ><Text>1</Text></View>
            <View style={{ width: 50, height: 50, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center'}} ><Text>2</Text></View>
            <View style={{ width: 50, height: 50, backgroundColor: 'steelblue', alignItems: 'center', justifyContent: 'center'}} ><Text>3</Text></View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgb(126, 239, 204)',
    flex: 1,
  },
  wapperTitle: {
    position: 'absolute',
  },
  headerTitle: {  
    fontSize: 100,
    fontFamily: 'Karla-Bold',
    top: 130,
    alignItems: 'center',
    height: 152,
    letterSpacing: -2,

  },
  contentHome: {
    flex: 2,
    top: 305,
    backgroundColor: 'rgb(0, 0, 0)',
  },
  inputWapper: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    backgroundColor: 'rgb(0, 0, 0)',
    height: 46,
    lineHeight: 46,
    borderColor: 'rgb(0, 0, 0)',
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth:2,
    paddingLeft: 60,
    paddingRight: 20,
    fontFamily: 'Karla-Regular',
    color: 'rgb(255, 255, 255)',
    flex: 1,
  },
  inputLabel: {
    color: 'rgb(184, 166, 228)',
    fontFamily: 'Karla-Bold',
    fontSize: 20,
  },
  icon: {
    color: 'rgb(184, 166, 228)',
    fontFamily: 'Karla-Bold',
    fontSize: 20,
  },
  left: {
    //alignItems: 'flex-start',
    flexDirection: 'column'
  },
  right: {
    //alignItems: 'center',
    left: 209,
    flexDirection: 'column'
  },
  button: {
    backgroundColor: 'rgb(184, 166, 228)',
    //color: 'rgb(0, 0, 0)',
    fontSize: 26,
    fontFamily: 'Karla-Bold',
    justifyContent: 'center',
    
  }
});


export default FlexBox;
