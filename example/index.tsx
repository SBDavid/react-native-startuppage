import { AppRegistry, Dimensions, StyleSheet } from 'react-native';
import { StartupPage, DefaultLoadingComp } from '../src/index';
import React from 'react';
const home_pic = require('./home_pic.png');

const { width } = Dimensions.get('screen');
const imgheight = (width / 375) * 250;
class AppWithLoading extends StartupPage {
  getLazyComponent(props: any) {
    const LazyApp = require('./src/App').default;
    return <LazyApp {...props} />;
  }

  getLoadingComp(_props: any): Element {
    return (
      <DefaultLoadingComp
        indicatorColor="black"
        indicatorSize={40}
        bgColor="grey"
        bgImageSource={home_pic}
        bgImageStyle={styles.homeImage}
        showIndicator={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  homeImage: {
    width: width,
    height: imgheight,
    position: 'absolute',
    zIndex: 0,
  },
});

AppRegistry.registerComponent('PageAnalyticsExample', () => AppWithLoading);
