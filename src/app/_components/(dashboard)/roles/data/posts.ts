import { fetchData } from '@app/_utils/fetch';

export const createRole = async (data) => {
  return await fetchData(`/roles`, 'POST', data);
};

export const addEmployeesToRole = async (id, data) => {
  return await fetchData(`/roles/${id}/employees`, 'POST', data);
};

