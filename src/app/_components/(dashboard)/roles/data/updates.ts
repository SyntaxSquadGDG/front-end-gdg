import { fetchData } from '@app/_utils/fetch';

export const updateRole = async (id, data) => {
  return await fetchData(`/roles/${id}`, 'PUT', data);
};

