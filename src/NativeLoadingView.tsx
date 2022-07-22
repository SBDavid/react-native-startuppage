import {
  requireNativeComponent,
  View,
  StyleSheet,
  Animated,
  Platform,
  NativeModules,
} from 'react-native';
import React from 'react';

const NativeLoadingView: any = requireNativeComponent('LoadingView');
type LoadingViewState = {
  done: boolean;
  fadeAnim: Animated.Value;
};
export default class LoadingView extends React.PureComponent<
  any,
  LoadingViewState
> {
  state = {
    done: false,
    fadeAnim: new Animated.Value(1),
  };
  componentDidMount() {
    if (Platform.OS === 'android') {
      // do nothing
    } else {
      NativeModules.TipView.showLoading();
    }
  }

  hideLoading() {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        this.fadeOut();
      }, 200);
      setTimeout(() => {
        this.setState({
          done: true,
        });
      }, 300);
    } else {
      setTimeout(() => {
        NativeModules.TipView.hideLoading();
      }, 200);
    }
  }

  fadeOut = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    if (Platform.OS === 'android') {
      return this.state.done ? null : (
        <Animated.View
          style={[
            styles.container,
            StyleSheet.absoluteFillObject,
            {
              opacity: this.state.fadeAnim, // Bind opacity to animated value
            },
          ]}
        >
          <View style={styles.loadingBg}>
            <NativeLoadingView style={styles.loadingView} />
          </View>
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  loadingView: {
    width: 50,
    height: 50,
  },
  loadingBg: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
