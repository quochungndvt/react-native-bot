import React, { Component } from 'react';
import { Navigator, BackAndroid, Platform  } from 'react-native';
import SideMenu from './common/SideMenu';
import ContainerPage from './ContainerPage';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';
import FlexBox from './containers/FlexBox';

class FDNavigator extends Component {
    constructor(props) {
      super(props);
      this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
      this.navigateGet = this.navigateGet.bind(this);
      this.openDrawer  = this.openDrawer.bind(this);
      this._handlers = ([]: Array<() => boolean>)
    }
    
    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    drawerExt: ? SideMenu;
    navigatorGet: ? Navigator;
    getChildContext() {
      return {
        addBackButtonListener: this.addBackButtonListener,
        removeBackButtonListener: this.removeBackButtonListener,
      };
    }
    addBackButtonListener (listener) {
      this._handlers.push(listener);
    }

    removeBackButtonListener (listener) {
      this._handlers = this._handlers.filter((handler) => handler !== listener);
    }
    handleBackButton() {
      for (let i = this.handlers.length - 1; i >= 0; i--) {
        if (this._handlers[i]()) {
          return true;
        }
      }

      const { navigator } = this.refs;
      if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
      }
      return false;
    }

    navigatorRenderScene(route, navigator) {
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
        default:
          return (
            <HomeContainer
            navigator={navigator}
            openDrawer={this.openDrawer}
            {...this.props}
            />
          );
      }
    }
    navigateGet(route) {      
      this.navigatorGet.push(route);
      this.drawerExt.closeDrawer();
    }
    openDrawer(){
      this.drawerExt.openDrawer();
    }
    render() {
      return (
        <SideMenu
        ref={(drawer) => { this.drawerExt = drawer; }}
        navigate={this.navigateGet}
        {...this.props}
        >
          <Navigator
          ref={(ref) => { this.navigatorGet = ref; }}
          style={styles.navigatorStyle}
          renderScene={this.navigatorRenderScene}
          configureScene={(route) => {
            if (Platform.OS === 'android') {
              return Navigator.SceneConfigs.FloatFromBottomAndroid;
            }
            return Navigator.SceneConfigs.FloatFromBottom;
          }}
          initialRoute={{ name: 'homepage' }}
          />
        </SideMenu>
      );
    }
}
const styles = {
  navigatorStyle: {
    flex: 1
  }
};
FDNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};
export default FDNavigator;
