const getDuration = (value: number) => {
  if (typeof value !== 'number' && !Number.isNaN(value)) {
    return;
  }

  const hour: number = Math.floor(value / 60 / 60);
  const minute: number = Math.floor((value - hour * 60 * 60) / 60);
  const second: number = value - hour * 60 * 60 - minute * 60;

  let duration = '';
  if (hour > 0) {
    duration += `${hour}时`;
  }

  if (minute > 0) {
    duration += `${minute}分`;
  }
  duration += `${second}秒`;

  return duration;
};

export default getDuration;
