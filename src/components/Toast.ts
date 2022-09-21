import {ToastAndroid} from 'react-native';

const show = (message: string, duration: number = ToastAndroid.SHORT) => {
  ToastAndroid.showWithGravity(message, duration, ToastAndroid.CENTER);
};

export default {show};
