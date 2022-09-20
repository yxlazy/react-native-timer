const isObject = (value: any) => {
  return value !== null && typeof isObject === 'object';
};

export default isObject;
