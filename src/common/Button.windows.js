import React, {Component} from 'react';
import {
  View, Image, StyleSheet, TouchableOpacity
} from 'react-native'
import { Text } from './Text';
import Colors from './Colors';

class Button extends React.Component {
  props: {
    type: 'primary' | 'secondary' | 'bordered';
    icon?: number;
    caption: string;
    style?: any;
    onPress: () => mixed;
  };

  static defaultProps = {
    type: 'primary',
  };

  render() {
    const caption = this.props.caption.toUpperCase();
    let icon;
    if (this.props.icon) {
      icon = <Image source={this.props.icon} style={styles.icon} />;
    }
    let content;
    
    var border = this.props.type === 'bordered' && styles.border;
    content = (
      <View style={[styles.button, border]}>
        {icon}
        <Text style={[styles.caption, styles.secondaryCaption]}>
          {caption}
        </Text>
      </View>
    ); 
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.container, this.props.style]}>
        {content}
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    //borderWidth: 1 / PixelRatio.get(),
  },
  button: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.lightText,
    borderRadius: HEIGHT / 2,
  },
  primaryButton: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
  },
  primaryCaption: {
    color: 'white',
  },
  secondaryCaption: {
    color: Colors.lightText,
  }
});

export default Button;
