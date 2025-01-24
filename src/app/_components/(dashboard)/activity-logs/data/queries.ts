import { fetchData } from '@app/_utils/fetch';

export const fetchActivities = async (page, limit) => {
  return await fetchData(
    `/employees/${1735224400}/activities?page=${page}&limit=${limit}`,
  );
};

export const fetchMyActivities = async (page, limit) => {
  return await fetchData(
    `/employees/${1735224400}/activities?page=${page}&limit=${limit}`,
  );
};

export const fetchSectionsActivities = async (id, page, limit) => {
  return await fetchData(
    `/employees/${1735224400}/activities?page=${page}&limit=${limit}`,
  );
};

export const fetchSectionActivities = async (id, page, limit) => {
  return await fetchData(
    `/employees/${1735224400}/activities?page=${page}&limit=${limit}`,
  );
};

export const fetchFolderActivities = async (id, page, limit) => {
  return await fetchData(
    `/employees/${1735224400}/activities?page=${page}&limit=${limit}`,
  );
};

export const fetchFileActivities = async (id, page, limit) => {
  return await fetchData(
    `/employees/${1735224400}/activities?page=${page}&limit=${limit}`,
  );
};

export const fetchEmployeeActivities = async (id, page, limit) => {
  return await fetchData(
    `/employees/${1735224400}/activities?page=${page}&limit=${limit}`,
  );
};

