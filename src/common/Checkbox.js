import React, { Component } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import HFIcon from './HFIcon';
class CheckBox extends Component {
  static contextTypes = {
    theme: React.PropTypes.object,
  }
  getBackgroundColor() {
    const backgroundColor = ['transparent'];

    if (this.props.checked) {
      backgroundColor.push((this.props.color) ? this.props.color : 'transparent');
    } else {
      backgroundColor.push('transparent');
    }
    return backgroundColor[1];
  }
  render() {
    return (
      <TouchableOpacity
        ref={c => this._root = c}
        {...this.props}
        style={{
          borderRadius: ((Platform.OS === 'ios') ? 13 : 0),
          overflow: 'hidden',
          width: 20,
          height: 20,
          borderWidth:(( Platform.OS === 'ios') ? 1 : 2),
          paddingLeft: ((Platform.OS === 'ios') ? 4 : 2),
          paddingBottom: ((Platform.OS === 'ios') ? 0 : 5),
          borderColor: (this.props.color ? this.props.color : '#039BE5'),
          backgroundColor: this.getBackgroundColor()
        }}
        >
        <HFIcon name={((Platform.OS === 'ios') && (this.props.platformStyle !== 'material')) ? 'ios-checkmark-outline' : 'md-checkmark'} />
      </TouchableOpacity>
    );
  }
}

CheckBox.propTypes = {
  ...TouchableOpacity.propTypes,
  style: React.PropTypes.object,
  checked: React.PropTypes.bool,
};

export default CheckBox;
