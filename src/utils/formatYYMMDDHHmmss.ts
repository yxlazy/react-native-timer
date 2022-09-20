const addPrefix = (value: number) =>
  String(value).length === 1 ? `0${value}` : value;

/**
 * 将时间戳格式化为YYMMDD HH:mm:ss
 * @param value
 * @returns
 */
const formatYYMMDDHHmmss = (value: number) => {
  const date = new Date(value);
  const year = addPrefix(date.getFullYear());
  const month = addPrefix(date.getMonth() + 1);
  const day = addPrefix(date.getDate());
  const hour = addPrefix(date.getHours());
  const minute = addPrefix(date.getMinutes());
  const second = addPrefix(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export default formatYYMMDDHHmmss;
