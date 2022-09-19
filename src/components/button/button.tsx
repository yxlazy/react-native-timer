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
    <View style={styles.container}>
      <Typography
        type={disabled ? 'grey' : 'white'}
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
    backgroundColor: Color.primary as string,
    borderRadius: 6,
  },
  content: {
    textAlign: 'center',
    lineHeight: 40,
  },
});

export default Button;
