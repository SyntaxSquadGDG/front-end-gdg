import { fetchData } from '@app/_utils/fetch';

export const fetchManagers = async (page, limit) => {
  return await fetchData(`/employees?page=${page}&limit=${limit}`);
};

export const fetchManagerActivities = async (id, page, limit) => {
  return await fetchData(
    `/employees/${id}/activities?page=${page}&limit=${limit}`,
  );
};

export const fetchManager = async (id) => {
  return await fetchData(`/employees/${id}`);
};

