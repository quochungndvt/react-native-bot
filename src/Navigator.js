import React, { Component } from 'react';
import { Navigator, BackAndroid, Platform, StyleSheet  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideMenu from './common/SideMenu';
import ContainerPage from './ContainerPage';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';
import ComposeContainer from './containers/ComposeContainer';
import GalleryContainer from './containers/GalleryContainer';
import CaptureContainer from './containers/CaptureContainer';
import StatsContainer from './containers/StatsContainer';
import SettingContainer from './containers/SettingContainer';
import FlexBox from './containers/FlexBox';
import Cube from './components/homepage/Cube';
import MapContainer from './containers/MapContainer';

var FDNavigator = React.createClass({
  _handlers: ([]: Array<() => boolean>),

  componentDidMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillUnmount: function() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  getChildContext: function() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  },

  addBackButtonListener: function(listener) {
    console.log("addBackButtonListener",listener);
    this._handlers.push(listener);
  },

  removeBackButtonListener: function(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  },

  handleBackButton: function() {
    console.log("handleBackButton",this._handlers);
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  },
  navigateGet: function(route) {      
    this.navigatorGet && this.navigatorGet.push(route);
    this.drawerExt && this.drawerExt.closeDrawer();
  },
  openDrawer: function(){
    this.drawerExt && this.drawerExt.openDrawer();
  },
  navigatorRenderScene: function(route, navigator) {
    switch (route.name) {
      case 'homepage':
        return (
          <HomeContainer
          navigator={navigator}
          openDrawer={this.openDrawer}
          {...this.props}
          />);
      case 'flexbox':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          title={route.name}
          openDrawer={this.openDrawer}
          >
            <FlexBox
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      case 'profile':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          openDrawer={this.openDrawer}
          title={'Profile'}
          >
            <ProfileContainer
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      case 'compose':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          openDrawer={this.openDrawer}
          title={'Compose'}
          >
            <ComposeContainer
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      case 'gallery':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          openDrawer={this.openDrawer}
          title={'Gallery'}
          >
            <GalleryContainer
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      case 'capture':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          openDrawer={this.openDrawer}
          title={'Capture'}
          >
            <CaptureContainer
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      case 'stats':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          openDrawer={this.openDrawer}
          title={'Stats'}
          >
            <StatsContainer
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      case 'setting':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          openDrawer={this.openDrawer}
          title={'Setting'}
          >
            <SettingContainer
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      case 'cube':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          openDrawer={this.openDrawer}
          title={'Cube'}
          >
            <Cube
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      case 'map':
        return (
          <ContainerPage
          navigator={navigator}
          onBack={this.handleBackButton}
          openDrawer={this.openDrawer}
          title={'Map'}
          >
            <MapContainer
            navigator={navigator}
            {...this.props}
            />
          </ContainerPage>
          );
      default:
        return (
          <HomeContainer
          navigator={navigator}
          openDrawer={this.openDrawer}
          {...this.props}
          />
        );
    }
  },
  render: function() {
    return (
      <SideMenu
        ref={(drawer) => { this.drawerExt = drawer; }}
        navigate={this.navigateGet}
        addBackButtonListener={this.addBackButtonListener}
        removeBackButtonListener={this.removeBackButtonListener}
        {...this.props}
        >
          <Navigator
          ref={(ref) => { this.navigatorGet = ref; }}
          style={styles.navigatorStyle}
          renderScene={this.navigatorRenderScene}
          configureScene={(route) => {
            {/*if (Platform.OS === 'android') {
              return Navigator.SceneConfigs.PushFromRight;
            }*/}
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          initialRoute={{ name: 'homepage' }}
          />
        </SideMenu>
    );
  }
});


let styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(232, 218, 217, 0.5)',
  },
})

FDNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

function select(store) {
  return {
    //tab: store.navigation.tab,
    isLoggedIn: store.isLogin,
  };
}
const mapStateToProps = state => ({
    account: state.account,
})

const mapDispatchToProps = dispatch => ({

})
export default connect(select, mapStateToProps, mapDispatchToProps)(FDNavigator)