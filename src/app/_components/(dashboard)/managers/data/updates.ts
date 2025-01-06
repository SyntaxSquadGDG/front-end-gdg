import { fetchData } from '@app/_utils/fetch';

export const updateManager = async (id, data) => {
  return await fetchData(`/managers/${id}`, 'POST', data);
};

