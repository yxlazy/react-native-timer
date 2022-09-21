import {STORAGE_KEYS} from '../constants/storage';
import storage from './storage';

type ProjectData = {
  id: number;
  content: string;
  duration: number;
  [k: string]: any;
};

type ProjectList = Array<ProjectData>;

/**
 * 保存到storage
 */
const saveProjectList = (data: ProjectList) =>
  storage.createData(STORAGE_KEYS.PROJECT_LIST, data);
/**
 * 更新storage中的数据
 */
const updateProject = (data: ProjectData) =>
  storage.updateData(STORAGE_KEYS.PROJECT_LIST, {data});

export const getProjectList = async (): Promise<ProjectList> => {
  return await storage.findData(STORAGE_KEYS.PROJECT_LIST);
};

/**
 * 更新
 */
export const updateProjectList = async (
  data: ProjectData,
): Promise<ProjectList> => {
  const projectList: Array<ProjectData> = await getProjectList();

  if (!projectList) {
    const source: ProjectList = [data];
    await saveProjectList(source);
    return source;
  }

  // 更新
  const hasUpdate = !!projectList.find(item => item.id === data.id);

  if (hasUpdate) {
    return await updateProject(data);
  } else {
    projectList.unshift(data);
    return await saveProjectList(projectList);
  }
};

/**
 * 删除
 */
export const deleteProjectList = async (id: number): Promise<ProjectList> => {
  const originData = await getProjectList();

  const data = originData.filter(item => item.id === id);

  return await saveProjectList(data);
};
