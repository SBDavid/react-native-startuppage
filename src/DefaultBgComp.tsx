import React from 'react';
import {
  View,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
  Image,
} from 'react-native';

export function DefaultBgComp(props: {
  bgColor?: string;
  bgImageStyle?: StyleProp<ImageStyle>;
  bgImageSource?: ImageSourcePropType;
}) {
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
    </View>
  );
}
