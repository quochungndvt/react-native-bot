import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
class CustomIcon extends Component {
  constructor(props) {
      super(props);       
  }
  render() {
    return (
        <Icon name={this.props.name ? this.props.name : ''} size={this.props.size ? this.props.size : 30} color={this.props.color ? this.props.color : "#900"} />
    );
  }
}
export default CustomIcon;