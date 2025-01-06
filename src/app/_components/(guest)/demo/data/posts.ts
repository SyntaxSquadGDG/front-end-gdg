import { fetchData } from '@app/_utils/fetch';

export const demo = async (data) => {
  return await fetchData('/demo', 'POST', data);
};

