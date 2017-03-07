import React, { Component } from 'react';
import { Navigator, BackAndroid, Platform } from 'react-native';
import SideMenu from './common/SideMenu';
import ContainerPage from './ContainerPage';
import HomeContainer from './containers/HomeContainer';
import FlexBox from './containers/FlexBox';

class FDNavigator extends Component {
    constructor(props) {
      super(props);
      this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
      this.navigateGet = this.navigateGet.bind(this);
    }
    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction);
    }
    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
    }
    drawerExt: ? SideMenu;
    navigatorGet: ? Navigator;
    handleBackButton() {
      for (let i = this.handlers.length - 1; i >= 0; i--) {
        if (this.handlers[i]()) {
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
            {...this.props}
            />);
        case 'flexbox':
          return (
            <ContainerPage
            navigator={navigator}
            onBack={this.handleBackButton}
            drawer={this.drawerExt}
            >
              <FlexBox
              navigator={navigator}
              {...this.props}
              />
            </ContainerPage>
            );
        default:
          return (
            <ContainerPage
            navigator={navigator}
            onBack={this.handleBackButton}
            drawer={this.drawerExt}
            >
              <FlexBox
              navigator={navigator}
              {...this.props}
              />
            </ContainerPage>
          );
      }
    }
    navigateGet(route) {
        this.navigatorGet.push(route);
        this.drawerExt.closeDrawer();
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
export default FDNavigator;
