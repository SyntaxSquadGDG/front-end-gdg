import { fetchData } from '@app/_utils/fetch';

export const createEmployee = async (data) => {
  return await fetchData(`/employees`, 'POST', data);
};

export const addRolesToEmployee = async (id, data) => {
  return await fetchData(`/employees/${id}/roles`, 'POST', data);
};

