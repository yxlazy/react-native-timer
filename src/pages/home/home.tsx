import React, {Fragment, useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Button from '../../components/button';
import Empty from '../../components/empty';
import Typography from '../../components/typography';
import {Color, FontColor} from '../../constants/styles';
import formatHHMMSS from '../../utils/formatHHMMSS';
import formatYYMMDDHHmmss from '../../utils/formatYYMMDDHHmmss';
import getDuration from '../../utils/getDuration';
import {getProjectList, updateProjectList} from '../../utils/projectStorage';
import timeMeter from '../../utils/timeMeter';

let timer: any = null;

const Home = () => {
  const [count, setCount] = useState(0);
  const [showPause, setShowPause] = useState(false);
  const [hasRest, setHasRest] = useState(false);
  const {height} = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [duration, setDuration] = useState(0);

  const [dataSource, setDataSource] = useState<
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
    setDuration(count);
    timer && timer.init(setCount);
    setHasRest(false);
    setShowPause(false);
    onPressModalOpen();
  };

  // Modal
  const onPressModalOpen = () => {
    setVisible(true);
  };

  const onPressModalClose = async () => {
    setVisible(false);

    const data = await updateProjectList({
      id: Date.now(),
      content: text,
      duration,
    });

    setDataSource(data);
  };

  const onChangeText = (value: string) => {
    setText(value);
  };

  useEffect(() => {
    timer = timeMeter();

    return () => timer && timer.cancel();
  }, []);

  useEffect(() => {
    getProjectList().then(data => setDataSource(data));
  }, []);

  return (
    <Fragment>
      <View style={{...styles.container, minHeight: height}}>
        {/* 内容 */}
        <FlatList
          ListEmptyComponent={<Empty />}
          data={dataSource}
          renderItem={({item, index}) => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.renderItem,
                borderBottomWidth: dataSource.length === index + 1 ? 0 : 1,
              }}>
              <View>
                <Typography>{item.content}</Typography>
                <Typography>{formatYYMMDDHHmmss(item.id)}</Typography>
              </View>
              <Typography>{getDuration(item.duration)}</Typography>
            </View>
          )}
          // refreshing
          style={styles.list}
        />
        {/* 计时器 */}
        {hasRest && (
          <View style={styles.timerContentWrapper}>
            <Text style={styles.timerContent}>{formatHHMMSS(count)}</Text>
          </View>
        )}
        {/* 按钮 */}
        <View style={{...styles.btnsWrapper, top: height - 100}}>
          {showPause ? (
            <Button text="暂停" onPress={onPressPause} />
          ) : (
            <Button text={hasRest ? '继续' : '开始'} onPress={onPressStart} />
          )}
          <Button text="结束" onPress={onPressEnd} disabled={!hasRest} />
        </View>
      </View>
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>输入名称</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            autoFocus
          />
        </View>
        <Pressable onPress={onPressModalClose} style={styles.modalBtnWrapper}>
          <Text style={styles.modalBtn}>添加</Text>
        </Pressable>
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // padding: 12,
    paddingBottom: 100,
  },
  list: {
    minHeight: 600,
  },
  timerContentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingBottom: '50%',
    position: 'absolute',
    backgroundColor: Color.default,
    left: 0,
    right: 0,
  },
  timerContent: {
    fontSize: 50,
    fontWeight: '600',
  },
  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, .23)',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Color.default,
    paddingBottom: 20,
  },
  renderItem: {
    // width: '93%',
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: Color.grey,
  },
  modalContainer: {
    padding: 20,
    flex: 1,
  },
  title: {
    marginBottom: 12,
    color: Color.black,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.grey,
    borderStyle: 'solid',
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalBtnWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    backgroundColor: Color.primary,
    height: 50,
    borderRadius: 6,
    width: '80%',
    marginLeft: 40,
  },
  modalBtn: {
    color: FontColor.white,
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Home;
