import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from '../../constants/styles';
import Typography from '../typography';

type Props = {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({text, disabled, onPress}: Props) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: disabled ? Color.grey : Color.primary,
      }}>
      <Typography
        type="white"
        style={styles.content}
        onPress={disabled ? undefined : onPress}>
        {text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    borderRadius: 6,
  },
  content: {
    textAlign: 'center',
    lineHeight: 40,
  },
});

export default Button;
