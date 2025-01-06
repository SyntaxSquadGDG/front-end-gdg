import { fetchData } from '@app/_utils/fetch';

export const createManager = async (data) => {
  return await fetchData(`/managers`, 'POST', data);
};

