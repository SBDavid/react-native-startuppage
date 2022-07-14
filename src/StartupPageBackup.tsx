// import React from 'react';
// import { View } from 'react-native';
// import { DefaultLoadingComp } from './DefaultLoadingComp';

// type P = {
//   rootTag?: number | undefined;
//   initialProps?: any;
//   initData?: any;
// };

// type S = {
//   isAppLoading: boolean;
//   showLoading: boolean;
// };

// export class StartupPage extends React.PureComponent<P, S> {
//   constructor(props: P) {
//     super(props);
//     this.FallbackComp = this._getLoadingComp(props);
//     this.BgComp = this.getBgComp(props);
//     this.state = {
//       isAppLoading: true,
//       showLoading: true,
//     };
//   }

//   private LazyComponent: Element | undefined;
//   private FallbackComp: Element | undefined;
//   private BgComp: Element | undefined;

//   componentDidMount() {
//     requestAnimationFrame(() => {
//       this.LazyComponent = this._getLazyComponent(this.props);
//       this.setState({ isAppLoading: false });
//     });
//   }

//   protected _getLoadingComp(_props: P): Element {
//     return (
//       <View
//         style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           top: 0,
//           left: 0,
//         }}
//       >
//         {this.getLoadingComp(_props)}
//       </View>
//     );
//   }

//   protected getLoadingComp(_props: P): Element {
//     return (
//       <DefaultLoadingComp
//         indicatorColor="#ec6f43"
//         indicatorSize={40}
//         indicatorDuration={300}
//       />
//     );
//   }

//   protected _getLazyComponent(_props: P): Element {
//     return (
//       <LazyComponentWrapper onMount={() => {
//         setTimeout(() => {
//           this.setState({ showLoading: false });
//         }, 300);
//       }}>
//         {this.getLazyComponent(_props)}
//       </LazyComponentWrapper>
//     );
//   }

//   protected getLazyComponent(_props: P): Element {
//     throw Error('getLazyComponent 未实现');
//   }

//   protected getBgComp(_props: P): Element | undefined {
//     return undefined;
//   }

//   render(): React.ReactNode {
//     if (this.BgComp === undefined) {
//       // return this.renderApp();
//     }

//     return (
//       <View style={{ width: '100%', height: '100%' }}>
//         {this.BgComp}
//         <View
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             top: 0,
//             left: 0,
//           }}
//         >
//           {this.renderApp()}
//         </View>
//         {this.state.showLoading ? this.FallbackComp : null}
//       </View>
//     );
//   }

//   renderApp(): React.ReactNode {
//     if (this.state.isAppLoading) {
//       return null;
//     }
//     return this.LazyComponent;
//   }
// }

// class LazyComponentWrapper extends React.PureComponent<{ onMount: any }> {
//   componentDidMount() {
//     this.props.onMount();
//   }

//   render() {
//     return this.props.children;
//   }
// }