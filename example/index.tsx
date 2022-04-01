import { AppRegistry } from 'react-native';
import { StartupPage, DefaultLoadingComp } from 'react-native-startuppage';
import React from 'react';

class AppWithLoading extends StartupPage {
  getLazyComponent(props: any) {
    const LazyApp = require('./src/App').default;
    return <LazyApp {...props} />;
  }

  getFallbackComp(_props: any): Element {
    return (
      <DefaultLoadingComp
        indicatorColor="black"
        indicatorSize={40}
        bgColor="white"
      />
    );
  }
}

AppRegistry.registerComponent('PageAnalyticsExample', () => AppWithLoading);
