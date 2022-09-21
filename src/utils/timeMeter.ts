import BackgroundTimer from 'react-native-background-timer';

const timeMeter = () => {
  let count = 0,
    intervalId: number;

  const exec = (fn?: (value: number) => void) => {
    intervalId = BackgroundTimer.setInterval(() => {
      // this will be executed every 200 ms
      // even when app is the the background
      count += 1;
      fn && fn(count);
      // console.log('tic', count);
    }, 1000);
  };

  const cancel = () => {
    BackgroundTimer.clearTimeout(intervalId);
  };

  const init = (fn?: (value: number) => void) => {
    count = 0;
    cancel();
    fn && fn(count);
  };

  const getStartTime = () => {
    return Date.now();
  };

  return {
    exec,
    cancel,
    getStartTime,
    init,
  };
};

export default timeMeter;
