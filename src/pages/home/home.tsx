import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Button from '../../components/button';
import Empty from '../../components/empty';
import Typography from '../../components/typography';
import formatHHMMSS from '../../utils/formatHHMMSS';
import timeMeter from '../../utils/timeMeter';

let timer: any = null;

const Home = () => {
  const [count, setCount] = useState(0);
  const [showPause, setShowPause] = useState(false);
  const [hasRest, setHasRest] = useState(false);
  const {height} = useWindowDimensions();
  const [dataSource] = useState<
    Array<{
      id: number;
      content: string;
      [k: string]: any;
    }>
  >([]);

  const onPressStart = () => {
    timer.exec(setCount);
    setShowPause(true);
    setHasRest(true);
  };

  const onPressPause = () => {
    timer && timer.cancel();
    setShowPause(false);
  };

  const onPressEnd = () => {
    timer && timer.init();
    setHasRest(false);
    setShowPause(false);
  };

  useEffect(() => {
    timer = timeMeter();

    return () => timer && timer.cancel();
  }, []);

  return (
    <View style={{...styles.container, minHeight: height}}>
      {/* 内容 */}
      <FlatList
        ListEmptyComponent={<Empty />}
        data={dataSource}
        renderItem={({item}) => (
          <View style={styles.renderItem}>
            <Typography>{item.content}</Typography>
          </View>
        )}
        // refreshing
      />
      {/* 计时器 */}
      <View style={styles.timerContentWrapper}>
        <Text style={styles.timerContent}>{formatHHMMSS(count)}</Text>
      </View>
      {/* 按钮 */}
      <View style={{...styles.btnsWrapper, top: height - 100}}>
        {showPause ? (
          <Button text="暂停" onPress={onPressPause} />
        ) : (
          <Button text="开始" onPress={onPressStart} />
        )}
        <Button text="结束" onPress={onPressEnd} disabled={!hasRest} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  timerContentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingBottom: '50%',
  },
  timerContent: {
    fontSize: 50,
    fontWeight: '600',
  },
  btnsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    height: 80,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, .23)',
  },
  renderItem: {
    width: '100%',
  },
});

export default Home;
