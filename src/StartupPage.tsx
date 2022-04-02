import React from 'react';

import { DefaultLoadingComp } from './DefaultLoadingComp';

type P = {
  rootTag?: number | undefined;
  initialProps?: any;
  initData?: any;
};

type S = {
  isLoading: boolean;
};

export class StartupPage extends React.PureComponent<P, S> {
  constructor(props: P) {
    super(props);
    this.FallbackComp = this.getLoadingComp(props);
    this.state = {
      isLoading: true,
    };
  }

  private LazyComponent: Element | undefined;
  private FallbackComp: Element | undefined;

  componentDidMount() {
    requestAnimationFrame(() => {
      this.LazyComponent = this.getLazyComponent(this.props);
      this.setState({ isLoading: false });
    });
  }

  protected getLoadingComp(_props: P): Element {
    return (
      <DefaultLoadingComp
        indicatorColor="#ec6f43"
        indicatorSize={40}
        indicatorDuration={800}
        bgColor="white"
      />
    );
  }

  protected getLazyComponent(_props: P): Element {
    throw Error('getLazyComponent 未实现');
  }

  render(): React.ReactNode {
    if (this.state.isLoading) {
      return this.FallbackComp;
    }
    return this.LazyComponent;
  }
}
