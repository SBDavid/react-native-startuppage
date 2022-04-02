import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
  Image,
} from 'react-native';
import { MaterialIndicator } from './material-indicator';

export function DefaultLoadingComp(props: {
  indicatorColor?: string;
  indicatorSize?: number;
  indicatorDuration?: number;
  showIndicator?: boolean;
  bgColor?: string;
  bgImageStyle?: StyleProp<ImageStyle>;
  bgImageSource?: ImageSourcePropType;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: props.indicatorDuration,
      easing: Easing.cubic,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  });

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: props.bgColor,
        height: '100%',
      }}
    >
      {props.bgImageSource || props.bgImageSource ? (
        <Image style={props.bgImageStyle} source={props.bgImageSource} />
      ) : null}
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: '100%',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {props.showIndicator == false ? null : (
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <MaterialIndicator
              color={props.indicatorColor}
              size={props.indicatorSize}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
}
