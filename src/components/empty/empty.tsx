import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Color} from '../../constants/styles';

const Empty = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../asserts/img/empty-icon.png')}
        resizeMethod="scale"
        style={styles.emptyIcon}
      />
      <Text style={styles.text}>还没有内容，快去添加吧</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 30,
    flex: 1,
  },
  emptyIcon: {
    width: 64,
    height: 64,
  },
  text: {
    marginTop: 12,
    color: Color.greyText,
  },
});

export default Empty;
