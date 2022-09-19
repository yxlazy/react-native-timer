const timeMeter = () => {
  let count = 0,
    timer: number;

  const exec = (fn?: (value: number) => void) => {
    timer = setTimeout(() => {
      count += 1;
      fn && fn(count);
      exec(fn);
    }, 1000);
  };

  const cancel = () => {
    clearTimeout(timer);
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
