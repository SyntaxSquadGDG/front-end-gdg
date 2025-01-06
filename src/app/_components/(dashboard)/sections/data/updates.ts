import { fetchData } from '@app/_utils/fetch';

export const renameSection = async (id, data) => {
  return await fetchData(`/sections/${id}`, 'PUT', data);
};
