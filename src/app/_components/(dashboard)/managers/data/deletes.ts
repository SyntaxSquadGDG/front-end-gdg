import { fetchData } from '@app/_utils/fetch';

export const deleteManager = async (id) => {
  return await fetchData(`/employees/${id}`, 'DELETE');
};

