/**
 * 返回HH:mm:ss格式
 * @param value 秒
 */
const formatHHMMSS = (value: number) => {
  let hour: string | number = Math.floor(value / 60 / 60);
  let minute: string | number = Math.floor((value - hour * 60 * 60) / 60);
  let second: string | number = value - hour * 60 * 60 - minute * 60;

  if (String(hour).length === 1) {
    hour = '0' + hour;
  }
  if (String(minute).length === 1) {
    minute = '0' + minute;
  }
  if (String(second).length === 1) {
    second = '0' + second;
  }

  return `${hour}:${minute}:${second}`;
};

export default formatHHMMSS;
