import {STORAGE_KEYS} from '../constants/storage';
import storage from './storage';

type ProjectData = {
  id: number;
  [k: string]: any;
};

export const updateProjectList = async (data: ProjectData) => {
  const projectList: Array<ProjectData> = await storage.findData(
    STORAGE_KEYS.PROJECT_LIST,
  );

  if (!projectList) {
    const source = [data];
    await storage.createData(STORAGE_KEYS.PROJECT_LIST, source);
    return source;
  }

  // 更新
  const hasUpdate = !!projectList.find(item => item.id === data.id);

  if (hasUpdate) {
    return await storage.updateData(STORAGE_KEYS.PROJECT_LIST, {data});
  } else {
    projectList.push(data);
    return await storage.createData(STORAGE_KEYS.PROJECT_LIST, projectList);
  }
};

export const getProjectList = async () => {
  return await storage.findData(STORAGE_KEYS.PROJECT_LIST);
};
