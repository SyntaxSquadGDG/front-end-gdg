import { fetchData } from '@app/_utils/fetch';

export const updateEmployee = async (id, data) => {
  return await fetchData(`/employees/${id}`, 'PUT', data);
};

