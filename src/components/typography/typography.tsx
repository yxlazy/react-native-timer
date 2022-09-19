import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {FontColor} from '../../constants/styles';

type props = {
  children?: string;
  type?: keyof typeof FontColor;
  onPress?: () => void;
} & TextProps;

const Typography = ({children, style, type = 'default', ...rest}: props) => {
  return (
    <Text
      {...rest}
      style={{
        ...styles.text,
        color: FontColor[type],
        ...((style as any) || {}),
      }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export default Typography;
