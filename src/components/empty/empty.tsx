import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Typography from '../typography';

const Empty = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../asserts/img/empty-icon.png')}
        resizeMethod="scale"
        style={styles.emptyIcon}
      />
      <Typography type="grey">还没有内容，快去添加吧</Typography>
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
});

export default Empty;
