import Storage, {LoadParams} from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deepClone from './deepClone';

const storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 100000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  // defaultExpires: null,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // sync: require('你可以另外写一个文件专门处理sync'),
});

type CreateOptions = {
  id?: string;
  expires?: number | null;
};

/**
 * 新建数据或状态
 *
 * @param key
 * @param data 如果保存的是数据（特指可能会存放到数据库的数据），则存储为数组形式，且每个元素皆为包含id的对象
 * @param options
 * @returns
 */
async function createData(key: string, data: any, options: CreateOptions = {}) {
  await storage.save({
    key,
    data,
    ...options,
  });

  return data;
}

// 读取数据
async function findData(key: string, options: Omit<LoadParams, 'key'> = {}) {
  let data = await storage
    .load({
      key,
      ...options,
    })
    .catch(err => {
      //如果没有找到数据且没有sync方法，
      //或者有其他异常，则在catch中返回
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          data = null;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });

  return data;
}

// 更新数据
async function updateData(
  key: string,
  options: {id?: string; data?: any} = {},
) {
  const {id, data: originData} = options;
  const data = await findData(key, {id});

  // 数据合并
  // 只有key和originData
  if (Array.isArray(data) && Boolean(originData.id)) {
    const needUpdateData = data.find(item => item.id === originData.id);

    deepClone(needUpdateData, originData);
  }

  await createData(key, data, {id});

  return data;
}

// 删除数据
function deleteData(
  key?: string,
  options: {id?: string; clearUnderKey?: boolean} = {},
) {
  // 清空map，移除所有"key-id"数据（但会保留只有key的数据）
  if (!key) {
    return storage.clearMap();
  }

  const {clearUnderKey, ...rest} = options;

  // 清除某个key下的所有数据(仅key-id数据)
  if (clearUnderKey) {
    return storage.clearMapForKey(key);
  }

  // 删除单个数据
  // 可以指定id
  return storage.remove({
    key,
    ...rest,
  });
}

export default {
  createData,
  findData,
  updateData,
  deleteData,
};
