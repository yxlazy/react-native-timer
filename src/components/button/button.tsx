import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../../constants/styles';

type Props = {
  text?: string;
  onPress?: () => void;
};

const Button = ({text, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content} onPress={onPress}>
        {text}
      </Text>
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
    color: Color.whiteText,
  },
});

export default Button;
