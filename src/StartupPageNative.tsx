import React from 'react';
import { View } from 'react-native';
import LoadingView from './NativeLoadingView';

type P = {
  rootTag?: number | undefined;
  initialProps?: any;
  initData?: any;
};

type S = {
  isAppLoading: boolean;
};

export class StartupPage extends React.PureComponent<P, S> {
  loadingViewRef = React.createRef<LoadingView>();

  constructor(props: P) {
    super(props);
    this.state = {
      isAppLoading: true,
    };
  }

  private LazyComponent: Element | undefined;

  componentDidMount() {
    requestAnimationFrame(() => {
      this.LazyComponent = this.getLazyComponent(this.props);
      this.setState({ isAppLoading: false });
      this.loadingViewRef.current?.hideLoading();
    });
  }

  protected getLazyComponent(_props: P): Element {
    throw Error('getLazyComponent 未实现');
  }

  render(): React.ReactNode {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        >
          {this.renderApp()}
        </View>
        <LoadingView ref={this.loadingViewRef} />
      </View>
    );
  }

  renderApp(): React.ReactNode {
    if (this.state.isAppLoading) {
      return null;
    }
    return this.LazyComponent;
  }
}
