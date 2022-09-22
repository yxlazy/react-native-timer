import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Color, FontColor} from '../../constants/styles';

type Props = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

const Header = ({text, style}: Props) => {
  return (
    <View style={{...styles.container, ...((style as any) || {})}}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: Color.default,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: FontColor.default,
    fontSize: 25,
    fontWeight: '800',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
