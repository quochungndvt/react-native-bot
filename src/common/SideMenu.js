/**
 * rn-drawer example app
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import { } from 'react-native';
import Drawer from 'react-native-drawer';
import MenuContents from './MenuContents';
import tweens from './tweens';


//let counter = 0;

class SideMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'displace',
      openDrawerOffset: 0,
      closedDrawerOffset: 0,
      panOpenMask: 0,
      panCloseMask: 0,
      relativeDrag: false,
      panThreshold: 0.25,
      tweenHandlerOn: false,
      tweenDuration: 200,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: true,
      acceptPan: true,
      tapToClose: false,
      negotiatePan: false,
      rightSide: false,

    };
    this.openDrawer = this.openDrawer.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }
  setDrawerType(type) {
    this.setState({
      drawerType: type
    });
  }
  setStateFrag(frag) {
    this.setState(frag);
  }
  tweenHandler(ratio) {
    if (!this.state.tweenHandlerPreset) { return {}; }
    return tweens[this.state.tweenHandlerPreset](ratio);
  }
  noopChange() {
    this.setState({
      changeVal: Math.random()
    });
  }
  handleBackButton() {
    this.closeDrawer();
    return true;
  }
  openDrawer() {
    this.drawer.open();
    if(this.props.addBackButtonListener) this.props.addBackButtonListener(this.handleBackButton);
  }
  closeDrawer() {
    this.drawer.close();
    if(this.context.removeBackButtonListener) this.context.removeBackButtonListener(this.handleBackButton);
  }


  render() {
    const menuContents = (<MenuContents      
      closeDrawer={() => this.drawer.close()}
      navigate={this.props.navigate}
    />);
    return (
      <Drawer
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={menuContents}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.rightSide ? 'right' : 'left'}
        navigator={this.props.navigator}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
          {this.props.children}
      </Drawer>
    );
  }
}


const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    shadowRadius: 0,
    backgroundColor: 'rgb(126, 239, 204)'
  }
};
SideMenu.contextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};
export default SideMenu;
