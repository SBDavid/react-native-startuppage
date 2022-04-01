# react-native-startuppage

RN应用统一启动动画。有一下有点：

- 接入方便：提供了默认配置、动画效果
- 使用Native动画，在js文件加载期间不卡顿
- loading效果可配置：可以更具设计需求自定义动画组件
- 高性能机型上不展示 loading 效果：通过fadein动画，使得loading动画在高性能机型上隐藏

## 安装

  + npm install @xmly/react-native-startuppage

## 使用
为了实现最短的白屏时长， `react-native-startuppage`需要在项目的入口文件中使用。并且减少在这个阶段引入的文件数量

所有的业务项目依赖应该在 `App.js`中引入。

### 基本使用，使用默认配置

使用`require('./src/App').default`实现业务代码的延迟加载

index.jsx
```js
import { AppRegistry } from 'react-native';
import { StartupPage } from '../src/index';
import React from 'react';

class AppWithLoading extends StartupPage {
  getLazyComponent(props: any) {
    const initData = props.initData;
    const App = require('./src/App').default;
    return <App {...initData} />;
  }
}

AppRegistry.registerComponent('PageAnalyticsExample', () => AppWithLoading);

```

### 使用自定义配置
您可以使用默认的loading效果，也可以自己实现。
并且默认loading效果具备基本的样式配置

- indicatorColor：动画颜色，默认黑色
- indicatorSize：动画宽高，默认40px
- indicatorDuration：fadein动画时长，默认800ms
- bgColor?：背景色，默认白色

index.jsx
```js
import { AppRegistry } from 'react-native';
import { StartupPage } from '../src/index';
import React from 'react';

class AppWithLoading extends StartupPage {
  getLazyComponent(props: any) {
    const initData = props.initData;
    const App = require('./src/App').default;
    return <App {...initData} />;
  }

  getFallbackComp(props: any): Element {
    const isDarkMode = props.initData.isDarkMode;

    if (isDarkMode) {
      <DefaultLoadingComp
        indicatorColor="white"
        indicatorSize={40}
        bgColor="black"
      />
    }

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

```
