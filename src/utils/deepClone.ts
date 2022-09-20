const deepClone = (dest: Object, ...rest: Array<Object>) => {
  if (typeof dest === 'object' && dest !== null) {
    rest.forEach(sources => {
      for (const key in sources) {
        if (Object.hasOwn.call(sources, sources, key)) {
          const value = (sources as any)[key];

          if (typeof value === 'object' && value !== null) {
            // 判断目标对象上是否存在key
            if (Object.hasOwn.call(dest, dest, key)) {
              deepClone((dest as any)[key], value);
            }
            // 数组处理
            else if (Array.isArray(value)) {
              (dest as any)[key] = deepClone([], value);
            }
            // 对象处理
            else {
              (dest as any)[key] = deepClone({}, value);
            }
          }
          // 基础类型和函数处理
          else {
            (dest as any)[key] = value;
          }
        }
      }
    });
  }

  return dest;
};

export default deepClone;
